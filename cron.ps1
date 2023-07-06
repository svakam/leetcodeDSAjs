# runs every 12am PST
# https://learn.microsoft.com/en-us/powershell/module/psscheduledjob/?view=powershell-5.1

# Specify commans SC runs: ScriptBlock parameter
# Specify script that SC runs: FilePath parameter
# Add job trigger/s: Trigger parameter 
# Customize: Options parameter

# import the Read-Date function, which extracts a date from a markdown header containing a date
Import-Module .\Scripts\Read-Date.psm1
Import-Module .\Scripts\Add-FilenamesHeaders.psm1

# registers new job with trigger 12pm daily, script block specified below
function Register-LeetcodeJob {
    $T = New-JobTrigger -Daily -At "12:00 PM"
    Write-Output $T
    Register-ScheduledJob -Name $taskName -Trigger $T -ScriptBlock {
        Update-Leetcode-Files
    }
    $job = Get-ScheduledJob -Name $taskName
    if (!$job) { 
        throw "Job was unable to register."
    }
    Write-Host "Registered new Leetcode job."
}

# check for existing job on local system: if doesn't exist, register it
#$taskExists = Get-ScheduledTask | Where-Object { $_.TaskName -like $taskName }
#if (!$taskExists) {
#    Register-LeetcodeJob
#}

#try {
#    $leetcodeJob = Get-ScheduledJob -Name $taskName
#    $leetcodeJob.Name
#    exit 0
#}
#catch {
#    "Job does not exist $_"
#}

$taskName = "LeetcodeJSDailyUpdate"
$repoPath = (Get-Location).ToString()

# README.md: refreshes files for each category, sorts alphabetically
function Update-LC-Readme {
    
}

# add change log to change log file:
    # search for change log file
    # if not exists, create new file
    # search for headers
    # add text with timestamp

function Update-LC-ChangeLog {
    
}


# LastModified.md: 
    # at start of new week, creates new header "# Week of Monday, <Date>"
    # runs through full file list and adds to header by file's last modified date
        # iterate through headers encountered, add as key of dictionary
        # iterate recursively through file list excluding non-coding problem files
            # add file to a key if file's last modified is 
            # stretch: file links? 
    # this helps me keep track of most recent problems reviewed for better review

# goal hashtable:
# 06/18/2023 - [[f4.js, 06/19/2023 9am]]
# 06/11/2023 - [[f3.js, 06/11/2023 6am],[f5.js, 06/13/2023 12pm]
# 06/04/2023 - [[f1.js,06/05/2023 7:30am], [f2.js,06/07/2023 8:00am]

# this function updates the LastModified.md file by obtaining the current list of headers, running through all valid leetcode files, and placing them under headers by
# the file's last modified date. also creates new headers if it's a new week
function Update-LC-LastModified {
    Write-Output "Repo path: $repoPath" # print the path of repo
    $filePath # declare file path var

    # initialize file found and work done bool vars
    $fileFound = $false
    $workDone = $false
    
    # search for last modified file and if found, set file found to true and file path to the path
    Get-ChildItem -Path "$repoPath" | ForEach-Object { 
        if ($_.BaseName -eq "LastModified") {
            
            $fileFound = $true
            $filePath = $_.FullName
            $workDone = $true
        }
    }

    if (!$fileFound) {
        Write-Host "File was not found."
    } else {
        
        Write-Host "File was found. Path: " $filePath

        # find most recent header in LastModified.md
        $mostRecentHeader
        $content = (Get-Content -Path $filePath)
        foreach ($line in $content) {
            if ($line -like "##*") {
                $line
                $mostRecentHeader = $line
                break
            }
        }
        Write-Host "Most recent header: $mostRecentHeader"

        # extract date from the most recent header
        $extractedDate = Read-Date -MdHeader $mostRecentHeader
        Write-Host "Extracted date from most recent header: $extractedDate"
        
        # check if it's been 7+ days since the most recent header in the .md
        $date = Get-Date
        Write-Host "Today's date: $date"
        if ([Int]$date.DayOfWeek -gt 0) {
            Write-Host "It's $date.DayOfWeek. Get this week's Sunday date"
            $date = $date.AddDays(-$date.DayOfWeek) # get this week's Sunday date
        }
        $dateString = "Week of Sunday, " + $date.Month + "/" + $date.Day + "/" + $date.Year # set a new date string with this Sunday's parameters (month, day, year)

        # directly compare extracted date to today's date; if it's within 7 days, don't add new header to file, or add one with this week's header from Sunday
        if ($extractedDate.Date.AddDays(7) -le $date.Date) {
            Write-Host "Been 7 days since most recent header. Add new header"

            # append new header between "# Last Modified" and the most recent last week header
            (Get-Content -Path $filePath) |
                ForEach-Object {
                    if ($_ -eq "# Last Modified") {
                        $_ -Replace "# Last Modified", "# Last Modified`n`n## $dateString"
                    } else {
                        $_
                    }
                } | Set-Content -Path $filePath
        } else {
            Write-Host "Still within last header's week. Don't append new header"
        }

        Add-FileNamesHeaders -RepoPath $repoPath -FilePath $filePath
    }
        
    if (!$workDone) { Write-Host "Work could not be done." }
    else { Write-Host "Work was completed." }
}

function Update-Leetcode-Files {
    # Update-LC-Readme
    Update-LC-LastModified
    # Update-LC-ChangeLog
}

Update-Leetcode-Files

