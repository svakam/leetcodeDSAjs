function ReWrite-ToLastModified {
    param (
        $filePath,
        $sortedTable
    )

    Write-Host "Rewriting last modified."

    Set-Content -Path $filePath "# Last Modified`n"
    
    foreach ($kvObj in $sortedTable) {
        $kvObj | ForEach-Object {
            if ($_.Value.Length -gt 0) {
                $sunday = $_.Key
                $file_modDateListThisWeek = $_.Value
                #$file_modDateListThisWeek
                
                # add header
                (Add-Content -Path $filePath "## Week of Sunday, $($sunday.Month)/$($sunday.Day)/$($sunday.Year)`n") | Wait-Process # important to wait until completed
                
                # add file names under this header if any
                $file_modDateListThisWeek | ForEach-Object {
                    (Add-Content -Path $filePath "[$($_.FileName)]($(($_.RelativePath).ToString())) ($($_.Category)), last modified at $($_.LastModified)`n") | Wait-Process
                }
            } else {
                Write-Host "$($_.Key) has no files in this week, skip appending"
            }
        }
    }
}