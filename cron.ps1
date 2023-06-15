# runs every 12am PST
# https://learn.microsoft.com/en-us/powershell/module/psscheduledjob/?view=powershell-5.1

# Specify commans SC runs: ScriptBlock parameter
# Specify script that SC runs: FilePath parameter
# Add job trigger/s: Trigger parameter 
# Customize: Options parameter

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
    # this helps me keep track of most recent problems reviewed for better review
    # last possible date variable will be kept track 

function Update-LC-LastModified {
    Write-Output "path: $repoPath"

    # set to true if file was found and work was done
    $fileFound = $false
    $workDone = $false

    Get-ChildItem -Path "$repoPath" | ForEach-Object { 

        if ($_.BaseName -eq "LastModified") {
            $fileFound = $true
            # base name: $_.BaseName (file name)
            # full name: $_.FullName (absolute path)
            # last modified: $_.LastWriteTime
            # append text: $_.FullName "<text>"
            # append new line and text: $_.FullName "`n<text>"

            (Get-Content -Path $_.FullName) | 
                ForEach-Object {
                    # do work on each line
                    $_ -Replace "Last", "First"
                } | Set-Content -Path $_.FullName
            Get-Content -Path $_.FullName
            $workDone = $true
        }
        if ($fileFound -and $workDone) { 
            Write-Output "File was found, work was done"
            break
        }
    }


}

function Update-Leetcode-Files {
    Update-LC-Readme
    Update-LC-LastModified
    Update-LC-ChangeLog
}

# registers new job with trigger 12pm daily, script block specified below
#function Register-LeetcodeJob {
#    $T = New-JobTrigger -Daily -At "12:00 PM"
#    Write-Output $T
#    Register-ScheduledJob -Name $taskName -Trigger $T -ScriptBlock {
#        Update-Leetcode-Files
#    }
#    $job = Get-ScheduledJob -Name $taskName
#    if (!$job) { 
#        throw "Job was unable to register."
#    }
#    Write-Host "Registered new Leetcode job."
#}

# check for existing job on local system: if doesn't exist, register it
#$taskExists = Get-ScheduledTask | Where-Object { $_.TaskName -like $taskName }
#if (!$taskExists) {
#    Register-LeetcodeJob
#}

Update-LC-LastModified

#try {
#    $leetcodeJob = Get-ScheduledJob -Name $taskName
#    $leetcodeJob.Name
#    exit 0
#}
#catch {
#    "Job does not exist $_"
#}


