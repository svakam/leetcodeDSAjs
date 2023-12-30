# runs every 12am PST
# https://learn.microsoft.com/en-us/powershell/module/psscheduledjob/?view=powershell-5.1

# Specify commans SC runs: ScriptBlock parameter
# Specify script that SC runs: FilePath parameter
# Add job trigger/s: Trigger parameter 
# Customize: Options parameter


# dot-source (import) the following high-level functions that update the .md files
#. ./Scripts/Update-LC-LastModified.ps1
#. ./Scripts/Update-LC-ReadMe.ps1

Start-Transcript -Path "C:\Users\vikra\dev\Repos\GitHub\leetcodeDSAjs\Scripts\logs\cron-log.txt" -Append

# paths
$updateReadMePath = "C:\Users\vikra\dev\Repos\GitHub\leetcodeDSAjs\Scripts\Update-LC-ReadMe.ps1" # path of Update-Readme.md
$updateLastModifiedPath = "C:\Users\vikra\dev\Repos\GitHub\leetcodeDSAjs\Scripts\Update-LC-LastModified.ps1" # path of LastModified.md
$repoPath = (Get-Location).ToString() # path of this repo

# names of Scheduled Jobs to register in Task Manager for each file
$readmeJob = "LeetcodeJSREADMEDaily" # ReadMe.md update job name
$lastModifiedJob = "LeetcodeJSLastModifiedWeekly" # LastModified.md update job name

# triggers
$WeeklyT = New-JobTrigger -Weekly -DaysOfWeek Sunday -At "12:00 PM" # weekly trigger, Sunday @ 12pm
$DailyT = New-JobTrigger -Daily -At "11:20 AM" # daily trigger @ 3pm

# default parameter for job option: wake to run, start if idle
$jobOption = New-ScheduledJobOption -RunElevated -WakeToRun -ContinueIfGoingOnBattery

# function to register new job with trigger 12pm daily, script block specified below
# input: job name, job trigger, option, path of file to run script on
# called after line 85
function Register-Job {
    param ( # accepts a job name, trigger, and job options object
        $jobName,
        $trigger,
        $jobOption,
        $filePath
    )

    Write-Host "`nIn Register-Job. Registering job with params job name $($jobName), trigger $($trigger), job option $($jobOption), and file path $($filePath)."

    Write-Output $trigger
    Write-Output $jobOption

    # try to register a job with name, trigger, option and path
    try {
        Register-ScheduledJob -Name $jobName -Trigger $trigger -ScheduledJobOption $jobOption -FilePath $filePath -ArgumentList "-ExecutionPolicy Bypass -File $filePath"
    } catch {
        throw "$($jobName) was unable to register. $_"
    }

    # get job from system and confirm registration by printing to console
    $job = Get-ScheduledJob -Name $jobName
    Write-Host $($job)

    Write-Host "Registered new $($jobName) job.`n"
}

# function to try updating the job if it already exists on the system
# input: job name, job trigger, option, path of file to run script on
# called after line 85
function Update-Job {
    param (
        $jobName,
        $trigger,
        $jobOption,
        $filePath
    )

    Write-Host "`nIn Update-Job. Updating job with params job name $($jobName), trigger $($trigger), job option $($jobOption), and file path $($filePath)."

    try {
        Get-ScheduledJob -Name $jobName | 
            Set-ScheduledJob -Name $jobName -Trigger $trigger -ScheduledJobOption $jobOption -FilePath $filePath -ArgumentList "-ExecutionPolicy Bypass -File $filePath" # updates job
    } catch {
        throw "Unable to fetch $($jobName) job. $_"
    }
    Write-Host "Updated last $($jobName) job.`n"
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
