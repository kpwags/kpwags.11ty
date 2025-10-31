if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    dotnet /home/keith/Apps/WagsMediaGenerator/WagsMediaGenerator.dll
elif [[ "$OSTYPE" == "darwin"* ]]; then
    dotnet /Users/keith/Apps/WagsMediaGenerator/WagsMediaGenerator.dll
elif [[ "$OSTYPE" == "win32" ]]; then
    echo "Windows Operating System Not Configured"
else
	echo "Unknown Operating System Detected"
	echo $OSTYPE
fi