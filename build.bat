@echo off
echo.
echo Temporarily removing Git from PATH to avoid link.exe conflict...
echo.

REM Save original PATH
set "ORIGINAL_PATH=%PATH%"

REM Remove Git directories from PATH
set "PATH=%PATH:C:\Program Files\Git\usr\bin;=%"
set "PATH=%PATH:C:\Program Files\Git\cmd;=%"
set "PATH=%PATH:C:\Program Files\Git\mingw64\bin;=%"

echo Building with cargo...
cargo build %*

REM Restore original PATH
set "PATH=%ORIGINAL_PATH%"

echo.
echo PATH has been restored.
