# dot-source script that re-writes the LastModified file with the updated dictionary of new/updated files with last modified dates
. ./Scripts/ReWrite-ToLastModified.ps1
. ./Scripts/Update-LC-ChangeLog.ps1


# class File_ModDate with properties FileName (name of file + extension) and LastModified (file's last-modified date on the system)
class File_ModDate {
    [string]$FileName
    [string]$Category
    [string]$RelativePath
    [DateTime]$LastModified

    File_ModDate([string]$fn, [string]$category, [string]$relativePath, [DateTime]$lm) {
        $this.FileName = $fn
        $this.Category = $category
        $this.RelativePath = $relativePath
        $this.LastModified = $lm
    }
}

# called by main function Update-LC-LastModified: takes in repo path and file path and creates a descending-sorted dictionary of files by last modified
function Add-FilenamesToHeaders {
    param (
        $repoPath,
        $filePath
    )

    Write-Host "Adding file names to headers."
    Write-Host "Repo path: $repoPath"
    Write-Host "Last modified file path: $filePath"

    $lastModTable = [ordered]@{}

    # add existing headers to a hashtable
    (Get-Content -Path $filePath) |
        ForEach-Object {
            if ($_ -like "##*") {
                $date = Read-Date -MdHeader $_
                $lastModTable.Add($date, (New-Object System.Collections.Generic.List[File_ModDate]))
            }
        }

    # recurse through all valid files
        # for each file, get first sunday of its week
        # if this sunday exists in the table, add this file and its last modified date as File_ModDate obj to its Sunday key list
    $count = 0
    (Get-ChildItem -Path $repoPath -Exclude "*.git*","*.md","*.txt","Node*","Scripts*","*.ps1","*.psm1","*.json") | # exclude irrelevant file types
        Get-ChildItem -Recurse -File | ForEach-Object {
            $count++
            $lastWriteTime = $_.LastWriteTime # get last write time of this file
            $firstSunday = $lastWriteTime.AddDays(-($lastWriteTime.DayOfWeek)) # get the first sunday Date of this object
            $firstSunZeroed = Get-Date -Date $firstSunday.Date -Hour 0 -Minute 0 -Second 0 -Millisecond 0 # zero-out this sunday Date
            if (!$lastModTable.Contains($firstSunZeroed)) { # if the table doesn't contain this sunday, add it as a key with a value of List<File_ModDate>
                $lastModTable.Add($firstSunZeroed, (New-Object System.Collections.Generic.List[File_ModDate]))
            }
            else {
                # get relative directory of file location
                $relativePath
                $fullPath = $_.FullName
                $relativePath = $fullPath.Substring($fullPath.IndexOf("leetcodeDSAjs"))
                $relativePath = $relativePath.Substring($relativePath.IndexOf("\") + 1);
                $category = $relativePath.Substring(0, $relativePath.IndexOf("\"))
                $relativePath = $relativePath -replace "\\", "/"
                #$category
                
                # create object
                $fileModDateObj = [File_ModDate]::new(
                    $_.Name,
                    $category,
                    $relativePath,
                    $_.LastWriteTime
                )
                $list = $lastModTable[$firstSunZeroed]
                $list.Add($fileModDateObj)
                $lastModTable[$firstSunZeroed] = $list
            }
        }
    Write-Host "Number of files processed: $count"
    #$lastModTable
    #Write-Output "last mod table before ordering"
    Write-Output ""

    $sortedPairs = $lastModTable.GetEnumerator() | Sort-Object -Property Name -Descending
    $rewriteDate = ReWrite-ToLastModified -FilePath $filePath -SortedTable $sortedPairs
    
    
}