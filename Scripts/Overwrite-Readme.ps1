function Overwrite-ReadMe {
    param(
        $repoPath,
        $filePath,
        $categoryTable
    )

    Write-Host "In Overwrite-Readme"
    $filePath

    Set-Content -Path $filePath "# Leetcode JS`n`nMy repository of Leetcode and general algo problems in JavaScript.`n"
    Add-Content -Path $filePath "(last auto-update $((Get-Date).DateTime))`n"
    Add-Content -Path $filePath "Files by last modified date, most recent to least: [LastModified.md](LastModified.md)`n"
    Add-Content -Path $filePath "Change log (WIP): [ChangeLog.md](ChangeLog.md)`n`n## Categories`n"

    $categories = @("Easy", "Medium", "Hard", "DSA", "Misc")
    foreach ($category in $categories) {
        $catList = $categoryTable[$category]

        (Add-Content -Path $filePath "### $($category)`n") | Wait-Process
        foreach ($file in $catList) {
            (Add-Content -Path $filePath "[$($file.FileName)]($($file.RelPath))`n") | Wait-Process
        }
    }

}