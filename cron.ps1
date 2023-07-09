# runs every 12am PST
# https://learn.microsoft.com/en-us/powershell/module/psscheduledjob/?view=powershell-5.1

# Specify commans SC runs: ScriptBlock parameter
# Specify script that SC runs: FilePath parameter
# Add job trigger/s: Trigger parameter 
# Customize: Options parameter


# dot-source (import) the following high-level functions that update the .md files
. ./Scripts/Update-LC-LastModified.ps1
. ./Scripts/Update-LC-ReadMe.ps1

$repoPath = (Get-Location).ToString()
$readmeJob = "LeetcodeJSREADMEDaily"
$lastModifiedJob = "LeetcodeJSLastModifiedWeekly"
$readmeJob = "LeetcodeJSCREADMEDaily"
$WeeklyT = New-JobTrigger -Weekly -DaysOfWeek Sunday -At "12:00 PM"
$DailyT = New-JobTrigger -Daily -At "12:00 PM"
$jobOption = New-ScheduledJobOption -RunElevated -WakeToRun -ContinueIfGoingOnBattery -StartIfOnBattery -StartIfIdle 

# registers new job with trigger 12pm daily, script block specified below

function Register-ReadmeJob {
    param (
        $jobName,
        $trigger,
        $jobOption
    )

    Write-Output $trigger
    Write-Output $jobOption

    try {
        Register-ScheduledJob -Name $jobName -Trigger $trigger -ScheduledJobOption $jobOption -ScriptBlock {
            Update-LC-ReadMe
        }
    } catch {
        throw "$($jobName) was unable to register. $_"
    }
    $job = Get-ScheduledJob -Name $jobName
    Write-Host $($job)

    Write-Host "Registered new $($jobName) job."
}

function Register-LastModifiedJob {
    param (
        $jobName,
        $trigger,
        $jobOption
    )

    Write-Output $trigger
    Write-Output $jobOption

    try {
        Register-ScheduledJob -Name $jobName -Trigger $trigger -ScheduledJobOption $jobOption -ScriptBlock {
            Update-LC-LastModified
        }
    } catch {
        throw "$($taskName) was unable to register. $_"
    }
    $job = Get-ScheduledJob -Name $jobName
    Write-Host $($job)

    Write-Host "Registered new $($jobName) job."
}

function Update-LastModifiedJob {
    param (
        $jobName,
        $trigger,
        $jobOption
    )

    Write-Output $trigger
    Write-Output $jobOption

    try {
        Get-ScheduledJob -Name $jobName | 
            Set-ScheduledJob -Name $jobName -Trigger $trigger -ScheduledJobOption $jobOption -ScriptBlock {
                Update-LC-LastModified
            }
    } catch {
        throw "Unable to fetch $($jobName) job. $_"
    }
    Write-Host "Updated last $($jobName) job."
}

function Update-ReadmeJob {
    param (
        $jobName,
        $trigger,
        $jobOption
    )

    Write-Output $trigger
    Write-Output $jobOption

    try {
        Get-ScheduledJob -Name $jobName | 
            Set-ScheduledJob -Name $jobName -Trigger $trigger -ScheduledJobOption $jobOption -ScriptBlock {
                Update-LC-ReadMe
            }
    } catch {
        throw "Unable to fetch $($jobName) job. $_"
    }
    Write-Host "Updated $($jobName) job."
}

# ---------------- MAIN ----------------- #
# check for existing job on local system: if doesn't exist, register it
Write-Host "Check for existing cron jobs that update Markdown files."

# try to get existing tasks on system
$lastModTask = Get-ScheduledTask | Where-Object { $_.TaskName -like $lastModifiedJob }
$readmeTask = Get-ScheduledTask | Where-Object { $_.TaskName -like $readmeJob }

# if they don't exist, register the job, else update it in case updates were made in the register functions
if (!$lastModTask) {
    Write-Host "Last mod task doesn't exist on the system; attempting to register a new job."
    Register-LastModifiedJob -JobName $lastModifiedJob -Trigger $WeeklyT -JobOption $jobOption
} else {
    Write-Host "Job $($lastModTask.TaskName) exists on the system at $($lastModTask.TaskPath). Updating job in case job registration details were modified"
    Update-LastModifiedJob -JobName $lastModifiedJob -Trigger $WeeklyT -JobOption $jobOption
}
if (!$readmeTask) {
    Write-Host "Last mod task doesn't exist on the system; attempting to register a new job."
    Register-ReadmeJob -JobName $readmeJob -Trigger $DailyT -JobOption $jobOption
} else {
    Write-Host "Job $($readmeTask.TaskName) exists on the system at $($readmeTask.TaskPath). Updating job in case job registration details were modified"
    Update-ReadmeJob -JobName $readmeJob -Trigger $DailyT -JobOption $jobOption
}
# --------------------------------------- #