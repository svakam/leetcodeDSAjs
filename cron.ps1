# runs every 12am PST
# https://learn.microsoft.com/en-us/powershell/module/psscheduledjob/?view=powershell-5.1
Register-ScheduledJob
# Specify commans SC runs: ScriptBlock parameter
# Specify script that SC runs: FilePath parameter
# Add job trigger/s: Trigger parameter 
# Customize: Options parameter




# README.md: refreshes files for each category, sorts alphabetically






# LastModified.md: 
# at start of new week, creates new header "# Week of Monday, <Date>"
# runs through full file list and adds to header by file's last modified date
# this helps me keep track of most recent problems reviewed for better review
# last possible date variable will be kept track of

