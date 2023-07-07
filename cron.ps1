# runs every 12am PST
# https://learn.microsoft.com/en-us/powershell/module/psscheduledjob/?view=powershell-5.1

# Specify commans SC runs: ScriptBlock parameter
# Specify script that SC runs: FilePath parameter
# Add job trigger/s: Trigger parameter 
# Customize: Options parameter

# import modules and other scripts
. .\Scripts\Update-LC-LastModified.ps1 # dot-source the function that adds file names to headers

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

function Update-Leetcode-Files {
    Update-LC-Readme
    Update-LC-LastModified
    # Update-LC-ChangeLog
}

Update-Leetcode-Files

