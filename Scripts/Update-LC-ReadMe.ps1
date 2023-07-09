. ./Scripts/Overwrite-Readme.ps1 # dot source external script to overwrite readme

# ----------------------- README.md: ------------------------ #
    # displays all leetcode files, categorized by difficulty
    # runs through full file list, excluding non-leetcode files and adds them to its category list
    # this helps me have easy links to navigate from the README.md
    # also contains links to LastModified.md and ChangeLog.md

# example hashtable:
# Easy - [f4.js]
# Medium - [f3.js,f5.js]
# Hard - [f1.js, f2.js]

# object containing file name and its relative path in the repo
class FileNameRelPath {
    [string]$FileName
    [string]$RelPath

    FileNameRelPath([string]$fn, [string]$rp) {
        $this.FileName = $fn
        $this.RelPath = $rp
    }
}

function Update-LC-Readme {
    Write-Output "Repo path: $repoPath" # print the path of repo
    
    $filePath # variable to store readme path
    $categoryTable = @{} # store dictionary categories with list of files
    $count = 0 # num files processed

    # search for last modified file and if found, set file found to true and file path to the path
    Get-ChildItem -Path "$repoPath" | ForEach-Object { 
        if ($_.BaseName -eq "README") {
            $fileFound = $true
            $filePath = $_.FullName
        }
    }

    ((Get-ChildItem -Path $repoPath -Exclude "*.git*","*.md","*.txt","Node*","Scripts*","*.ps1","*.psm1","*.json") | # exclude irrelevant file types
        Get-ChildItem -Recurse -File | ForEach-Object {

            $count++ # increment num file processed 
            
            # extract relative path and category from file full path
            $category
            $relativePath

            # get relative directory of file location
            $fullPath = $_.FullName
            $relativePath = $fullPath.Substring($fullPath.IndexOf("leetcodeDSAjs"))
            if ($relativePath.IndexOf("\") -gt 0) {
                $relativePath = $relativePath.Substring($relativePath.IndexOf("\") + 1);
            }
            if ($relativePath.IndexOf("\") -gt 0) {
                $category = $relativePath.Substring(0, $relativePath.IndexOf("\"))
            }
            $relativePath = $relativePath -replace "\\", "/"

            if (!$category -or $category -like "Misc" -or $category -like "img") {
                $category = "Misc"
            }

            # create new file object with file name and its relative path 
            $newFileObj = [FileNameRelPath]::new(
                $_.BaseName,
                $relativePath
            )

            if (!$categoryTable.ContainsKey($category)) { # if the table doesn't contain this sunday, add it as a key with a value of List<File_ModDate>
                $newList = (New-Object System.Collections.Generic.List[FileNameRelPath])
                $newList.Add($newFileObj)
                $categoryTable.Add($category, $newList)
            } else {
                $existingList = $categoryTable[$category]
                $existingList.Add($newFileObj)
                $categoryTable[$category] = $existingList
            }
        })

    Write-Host "Number of files processed: $count"
    
    $categoryTable.GetEnumerator() | ForEach-Object {
        $count = 0
        Write-Host "Number of files in category $($_.Key):"
        $($_.Value | ForEach-Object {
            $count++
        })
        Write-Host $count
    }

    Overwrite-ReadMe -RepoPath $repoPath -FilePath $filePath -CategoryTable $categoryTable
}