# runs every 12am PST
# https://learn.microsoft.com/en-us/powershell/module/psscheduledjob/?view=powershell-5.1

# Specify commans SC runs: ScriptBlock parameter
# Specify script that SC runs: FilePath parameter
# Add job trigger/s: Trigger parameter 
# Customize: Options parameter

$taskName = "LeetcodeJSDailyUpdate"

# registers new job with trigger 12pm daily, script block specified below
function Register-LeetcodeJob {
    $T = New-JobTrigger -Daily -At "12:00 PM"
    Write-Output $T
    $path = (Get-Location).ToString()
    Write-Output "Script path: $path"
    Register-ScheduledJob -Name $taskName -Trigger $T -ScriptBlock {
        # 
    }
    $job = Get-ScheduledJob -Name $taskName
    if (!$job) { 
        throw "Job was unable to register."
    }
    Write-Host "Registered new Leetcode job."
}

# check for existing job on local system: if doesn't exist, register it
$taskExists = Get-ScheduledTask | Where-Object { $_.TaskName -like $taskName }
if (!$taskExists) {
    Register-LeetcodeJob
} else {

    $leetcodeJob = Get-ScheduledJob -Name $taskName
    $jobName = $leetcodeJob.Name
    

    exit 0
}



# README.md: refreshes files for each category, sorts alphabetically






# LastModified.md: 
# at start of new week, creates new header "# Week of Monday, <Date>"
# runs through full file list and adds to header by file's last modified date
# this helps me keep track of most recent problems reviewed for better review
# last possible date variable will be kept track of

# add change log to change log file
