# called by Add-FilenamesToHeaders
function ReWrite-ToLastModified {
    param (
        $filePath,
        $sortedTable
    )

    Write-Host "Rewriting last modified."

    # Start file overwrite with Set-Content cmdlet
    Set-Content -Path $filePath "# Last Modified`n(Auto-updates locally every Sunday @ 12pm)`n"
    
    # iterate through table of modified files, from latest to earliest
    foreach ($kvObj in $sortedTable) {
        
        $kvObj | ForEach-Object {
            if ($_.Value.Length -gt 0) {
                
                if (!$firstValueHeader) { $firstValueHeader = $_.Key } # first value header to return out for adding to change log

                $sunday = $_.Key # header's DateTime
                $file_modDateListThisWeek = $_.Value # list of files for this week
                
                # ---- append-to-file the week's last modified files ---- #

                # add header
                (Add-Content -Path $filePath "## Week of Sunday, $($sunday.Month)/$($sunday.Day)/$($sunday.Year)`n") | Wait-Process # important to wait until completed
                
                # add file names under this header if any
                $file_modDateListThisWeek | ForEach-Object {
                    (Add-Content -Path $filePath "[$($_.FileName)]($(($_.RelativePath).ToString())) ($($_.Category)), last modified at $($_.LastModified)`n") | Wait-Process
                }
            } else {

                # don't add a new header if there was nothing done for this week! some keys (dates) are added with empty value lists (check why this is)
                Write-Host "$($_.Key) has no files in this week, skip appending"
            }
        }
    }

    # needs error handling
    return Get-Date
}