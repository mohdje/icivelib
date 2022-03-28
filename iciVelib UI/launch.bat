@echo off

if "%2"=="r" (   
    "D:\Projets\ReplaceLine\ReplaceLine\bin\Release\net6.0\ReplaceLine.exe" ".\src\main.js" 1 "import Activity from '@/activities/ResearchActivity.vue';"
    if "%1"=="b" (
        npm run build
        robocopy /s "D:\Projets\IciVelib\development\iciVelib UI\dist" "D:\Projets\IciVelib\development\mobile app\IciVelib\Assets\UI\researchActivity"
    )
    if "%1"=="s" (npm run serve)
)

if "%2"=="all" (
    echo Build ResearchActivity
    "D:\Projets\ReplaceLine\ReplaceLine\bin\Release\net6.0\ReplaceLine.exe" ".\src\main.js" 1 "import Activity from '@/activities/ResearchActivity.vue';"
    npm run build
    robocopy /s "D:\Projets\IciVelib\development\iciVelib UI\dist" "D:\Projets\IciVelib\development\mobile app\IciVelib\Assets\UI\researchActivity"

    echo Build All finished
)
   
   