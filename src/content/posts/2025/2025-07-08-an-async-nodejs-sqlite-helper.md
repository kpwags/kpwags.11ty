---
title: "An Async Node.js Sqlite Helper"
date: '2025-07-08T23:07:54.846Z'
permalink: /posts/2025/07/08/an-async-nodejs-sqlite-helper/index.html
description: "I built a small class and helper for Node.js to interact with sqlite and thought I'd share my solution."
tags:
  - Node.js
  - Development
  - TypeScript
  - JavaScript
  - Sqlite
---
When I first built my media repository API in Node.js, I ran into callback hell when running queries or commands against the database.
<!-- excerpt -->

As an example:

```ts
static readonly GetAllVideoGameSystems = (callback: (error: string | null, systems: VideoGameSystem[]) => void) => {
  const db = this.GetDatabase();

  const systems: VideoGameSystem[] = [];

  db.all(getAllVideoGameSystems, (err: any, rows: VideoGameSystemQueryReturn[]) => {
    db.close();

    if (err) {
      return callback(cleanSqliteError(err), []);
    }

    rows.forEach((row) => {
      systems.push({
        videoGameSystemId: row.VideoGameSystemId,
        name: row.Name,
        colorCode: row.ColorCode,
        videoGameCount: row.VideoGameCount,
      });
    });

    return callback(null, systems);
  });
};
```

I recently started work on another tool to manage my fitness data and I decided that this would not be sustainable. So after doing some searching, and thanks to some help from devs on Stack Overflow, I ended up building a new class to do my sqlite database calls. I figured I'd share the code in hopes that maybe it will help you. I loosely modeled it off of Dapper in .NET.

This does require the [sqlite3](https://www.npmjs.com/package/sqlite3) npm package.

<div class="code-block-filename">db.ts</div>

```ts
import sqlite3 from 'sqlite3';

const cleanSqliteError = (error: Error): string => error.message.replace('SQLITE_ERROR: ', '');

class db {
  private static GetDatabase = () => new sqlite3.Database('./path/to/db.db');

  static async Query<T>(sql: string, params: any = []): Promise<[error: string | null, data: T[]]> {
    return new Promise(function (resolve, reject) {
      try {
        const database = db.GetDatabase();

        database.all(sql, params, (err: Error, rows: T[]) => {
          database.close();

          if (err) {
            return reject([cleanSqliteError(err), []]);
          }

          resolve([null, rows]);
        });
      } catch (e) {
        return reject(e);
      }
    });
  }

  static async QuerySingle<T>(sql: string, params: any = []): Promise<[error: string | null, data: T | null]> {
    return new Promise(function (resolve, reject) {
      try {
        const database = db.GetDatabase();

        database.get(sql, params, (err: Error, row: T) => {
          database.close();

          if (err) {
            return reject([cleanSqliteError(err), []]);
          }

          if (!row) {
            return resolve([null, null]);
          }

          resolve([null, row]);
        });
      } catch (e) {
        return reject(e);
      }
    });
  }

  static async Execute(sql: string, params: any = []): Promise<string | null> {
    return new Promise(function (resolve, reject) {
      try {
        const database = db.GetDatabase();

        database.run(sql, params, (err: Error) => {
          database.close();

          if (err) {
            return reject(cleanSqliteError(err));
          }

          resolve(null);
        });
      } catch (e) {
        return reject(e);
      }
    });
  }
}

export { db };
```

Or, alternatively, if you prefer a JS version,

<div class="code-block-filename">db.js</div>

```js
import sqlite3 from 'sqlite3';

const cleanSqliteError = (error) => error.message.replace('SQLITE_ERROR: ', '');

class db {
  private static GetDatabase = () => new sqlite3.Database('./path/to/db.db');

  static async Query(sql, params = []) {
    return new Promise(function (resolve, reject) {
      try {
        const database = db.GetDatabase();

        database.all(sql, params, (err, rows) => {
          database.close();

          if (err) {
            return reject([cleanSqliteError(err), []]);
          }

          resolve([null, rows]);
        });
      } catch (e) {
        return reject(e);
      }
    });
  }

  static async QuerySingle(sql, params = []) {
    return new Promise(function (resolve, reject) {
      try {
        const database = db.GetDatabase();

        database.get(sql, params, (err, row) => {
          database.close();

          if (err) {
            return reject([cleanSqliteError(err), []]);
          }

          if (!row) {
            return resolve([null, null]);
          }

          resolve([null, row]);
        });
      } catch (e) {
        return reject(e);
      }
    });
  }

  static async Execute(sql, params = []) {
    return new Promise(function (resolve, reject) {
      try {
        const database = db.GetDatabase();

        database.run(sql, params, (err) => {
          database.close();

          if (err) {
            return reject(cleanSqliteError(err));
          }

          resolve(null);
        });
      } catch (e) {
        return reject(e);
      }
    });
  }
}

export { db };
```

Hopefully this helps. Here are links to Gists of them.

[db.ts](https://gist.github.com/kpwags/7f966654a47254169bd878df7426337c)

[db.js](https://gist.github.com/kpwags/573813e19d27bb4e60a5ead17a5d79c5)
