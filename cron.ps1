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
$taskName = "LeetcodeJSDailyUpdate"
$T = New-JobTrigger -Weekly -DaysOfWeek Sunday -At "12:00 PM"

function Update-Leetcode-Files {
    Update-LC-ReadMe
    Update-LC-LastModified
}

# registers new job with trigger 12pm daily, script block specified below
function Register-LeetcodeJob {
    Write-Output $T
    try {
        Register-ScheduledJob -Name $taskName -Trigger $T -ScriptBlock {
            Update-Leetcode-Files
        }
    } catch {
        throw "Job was unable to register. $_"
    }
    $job = Get-ScheduledJob -Name $taskName

    Write-Host "Registered new Leetcode job."
}

function Update-LeetcodeJob {
    Write-Output $T
    try {
        Get-ScheduledJob -Name $taskName | 
            Set-ScheduledJob -Name $taskName -Trigger $T -ScriptBlock {
                Update-Leetcode-Files
            }
    } catch {
        throw "Unable to fetch job. $_"
    }
    Write-Host "Updated existing Leetcode job."
}

    

# check for existing job on local system: if doesn't exist, register it
Write-Host "Check for existing cron job that updates Markdown files."
$task = Get-ScheduledTask | Where-Object { $_.TaskName -like $taskName }
if (!$task) {
    Write-Host "Job doesn't exist on the system; attempting to register a new job."
    Register-LeetcodeJob
} else {
    Update-LeetcodeJob
    Write-Host "Job $($task.TaskName) exists on the system at $($task.TaskPath). Updating job in case job registration details were modified"
}