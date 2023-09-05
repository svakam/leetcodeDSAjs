# runs every 12am PST
# https://learn.microsoft.com/en-us/powershell/module/psscheduledjob/?view=powershell-5.1

# Specify commans SC runs: ScriptBlock parameter
# Specify script that SC runs: FilePath parameter
# Add job trigger/s: Trigger parameter 
# Customize: Options parameter


# dot-source (import) the following high-level functions that update the .md files
# . ./Scripts/Update-LC-LastModified.ps1
# . ./Scripts/Update-LC-ReadMe.ps1

# paths

$updateReadMePath = "C:\Users\vikra\dev\Repos\GitHub\leetcodeDSAjs\Scripts\Update-LC-ReadMe.ps1"
$updateLastModifiedPath = "C:\Users\vikra\dev\Repos\GitHub\leetcodeDSAjs\Scripts\Update-LC-LastModified.ps1"
$repoPath = (Get-Location).ToString()
$readmeJob = "LeetcodeJSREADMEDaily" # ReadMe.md update job name
$lastModifiedJob = "LeetcodeJSLastModifiedWeekly" # LastModified.md update job name
$WeeklyT = New-JobTrigger -Weekly -DaysOfWeek Sunday -At "12:00 PM" # weekly trigger
$DailyT = New-JobTrigger -Daily -At "7:02 PM" # daily trigger

# job option should run: 
# - with priority
# - at job trigger's time if asleep or not
# - if comp on battery or plugged in
$jobOption = New-ScheduledJobOption -RunElevated -WakeToRun -ContinueIfGoingOnBattery -StartIfOnBattery 

# registers new job with trigger 12pm daily, script block specified below

function Register-Job {
    param ( # accepts a job name, trigger, and job options object
        $jobName,
        $trigger,
        $jobOption,
        $filePath
    )

    Write-Output $trigger
    Write-Output $jobOption

    # try to register a job with name, trigger, option and path
    try {
        Register-ScheduledJob -Name $jobName -Trigger $trigger -ScheduledJobOption $jobOption -RunNow -FilePath $filePath
    } catch {
        throw "$($jobName) was unable to register. $_"
    }

    # get job and print registration
    $job = Get-ScheduledJob -Name $jobName
    Write-Host $($job)

    Write-Host "Registered new $($jobName) job."
}

function Update-Job {
    param (
        $jobName,
        $trigger,
        $jobOption,
        $filePath
    )

    Write-Output $trigger
    Write-Output $jobOption

    try {
        Get-ScheduledJob -Name $jobName | 
            Set-ScheduledJob -Name $jobName -Trigger $trigger -ScheduledJobOption $jobOption -RunNow -FilePath $filePath
    } catch {
        throw "Unable to fetch $($jobName) job. $_"
    }
    Write-Host "Updated last $($jobName) job."
}

# ---------------- MAIN ----------------- #
# check for existing job on local system: if doesn't exist, register it
Write-Host "Check for existing cron jobs that update Markdown files."

# try to get existing tasks on system
$lastModTask = Get-ScheduledTask | Where-Object { $_.TaskName -like $lastModifiedJob }
$readmeTask = Get-ScheduledTask | Where-Object { $_.TaskName -like $readmeJob }

# if they don't exist, register the job, else update it in case updates were made to job parameters
if (!$lastModTask) {
    Write-Host "Last mod task doesn't exist on the system; attempting to register this job."
    Register-Job -JobName $lastModifiedJob -Trigger $WeeklyT -JobOption $jobOption -FilePath $updateLastModifiedPath
} else {
    Write-Host "Job $($lastModTask.TaskName) exists on the system at $($lastModTask.TaskPath). Updating job in case job registration details were modified"
    Update-Job -JobName $lastModifiedJob -Trigger $WeeklyT -JobOption $jobOption -FilePath $updateLastModifiedPath
}
if (!$readmeTask) {
    Write-Host "Readme task doesn't exist on the system; attempting to register this job."
    Register-Job -JobName $readmeJob -Trigger $DailyT -JobOption $jobOption -FilePath $updateReadMePath
} else {
    Write-Host "Job $($readmeTask.TaskName) exists on the system at $($readmeTask.TaskPath). Updating job in case job registration details were modified"
    Update-Job -JobName $readmeJob -Trigger $DailyT -JobOption $jobOption -FilePath $updateReadMePath
}
# --------------------------------------- #

