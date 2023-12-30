# import modules and other scripts
Import-Module ./Scripts/Read-Date.psm1 # import the Read-Date function, which extracts a date from a markdown header containing a date
. ./Scripts/Add-FilenamesToHeaders.ps1 # dot-source the function that adds file names to headers
. ./Scripts/Update-LC-ChangeLog.ps1 # dot-source functionality for adding updates of LastModified.md to ChangeLog.md

# ----------------------- LastModified.md: ------------------------ #
    # at start of new week, creates new header "# Week of Sunday, <Date>"
    # runs through full file list and adds to header by file's last modified date
        # iterate through headers encountered, add as key of dictionary
        # iterate recursively through file list excluding non-coding problem files
            # add file to a key if file's last modified is 
            # stretch: file links? 
    # this helps me keep track of most recent problems reviewed for better review

# example hashtable:
# 06/18/2023 - [[f4.js, 06/19/2023 9am]]
# 06/11/2023 - [[f3.js, 06/11/2023 6am],[f5.js, 06/13/2023 12pm]
# 06/04/2023 - [[f1.js,06/05/2023 7:30am], [f2.js,06/07/2023 8:00am]

# this function updates the LastModified.md file by obtaining the current list of headers, running through all valid leetcode files, and placing them under headers by
# the file's last modified date. also creates new headers if it's a new week
function Update-LC-LastModified {
    Write-Host "In Update-LC-LastModified."
    Write-Host "Repo path: $repoPath" # print the path of repo
    $filePath # declare file path var

    # initialize file found and work done bool vars
    $fileFound = $false
    $workDone = $false
    
    # search for last modified file and if found, set file found to true and file path to the path
    Get-ChildItem -Path "$repoPath" | ForEach-Object { 
        if ($_.BaseName -eq "LastModified") {
            $fileFound = $true
            $filePath = $_.FullName
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

        # directly compare extracted date to this week's Sunday; if it's within 7 days, don't add new header to file, else add this week's Sunday as new header
        if ($extractedDate.Date.AddDays(7) -le $date.Date) {
            Write-Host "Been 7 days since most recent header. Add new header"

            # append new header between "# Last Modified" and the most recent last week header
            (Get-Content -Path $filePath) |
                ForEach-Object {
                    if ($_ -eq "# Last Modified") {
                        $_ -Replace "# Last Modified", "# Last Modified`n`n## $dateString"
                    } else {
                        $_ # this somehow allows the remaining content to exist, since we're piping the content back into Set-Content after checking for additions
                    }
                } | Set-Content -Path $filePath # re-write content of file with added header
        } else {
            Write-Host "Still within last header's week. Don't append new header"
        }

        # add file names under appropriate headers
        Add-FileNamesToHeaders -RepoPath $repoPath -FilePath $filePath

        # update change log with current date of overwrite
        $overwriteDate = Get-Date -DisplayHint Date
        
        Write-Host "Rewrite date of LastModified: $($overwriteDate)"

        # create ChangeLog object
        $changeLogObj = [ChangeLog]::new(
            "LastModified.md", # file name
            $overwriteDate, # overwrite date
            "Rewrote LastModified.md" # in the future, this description can be more useful
        )

        # call Update-LC-ChangeLog, consuming ChangeLog and repo path
        $updatedChangeLog = Update-LC-ChangeLog -ChangeLogObj $changeLogObj -RepoPath $repoPath
        if ($updatedChangeLog) { 
            $workDone = $true
        }
        else { 
            $workDone = $false
        }
    }
        
    if (!$workDone) { Write-Host "Work could not be done." }
    else { Write-Host "Work was completed." }
}
# ----------------------------------------------------------- #

Update-LC-LastModified

# SIG # Begin signature block
# MIIbnQYJKoZIhvcNAQcCoIIbjjCCG4oCAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQU5ckXculFaHtNfECPJNSBIwH3
# Wn2gghYTMIIDBjCCAe6gAwIBAgIQd9HlbAor3bVHlV0McY3tADANBgkqhkiG9w0B
# AQsFADAbMRkwFwYDVQQDDBBBVEEgQXV0aGVudGljb2RlMB4XDTIzMTIyOTIzMTg1
# MVoXDTI0MTIyOTIzMzg1MVowGzEZMBcGA1UEAwwQQVRBIEF1dGhlbnRpY29kZTCC
# ASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAOCdx63kk+4Bx+ynxI+gxRCB
# 9I+0piuZZIQhFVuorN0oABpB5tt2Mr49WOT0HRzvpuOW1iwXoIkkeWfY4PMKL9AY
# 9hvJZnxgQZBZjkHsr6eLg9mk2U7IHBApA/W/iFBZI8cy+IgP9C/liVK4RmalQqpD
# OBZa15DC7+oY4cIkt8ysQ3F/+uo6+ShGTU0Al3rE+juLucWG5Q5B9UztSjiaXV2r
# txQnLkmQDF7CUx/322DaIKONsjrUMf74Sb6R6b9uqkBJathN0RXtPOaC89tiV0r/
# XZp6xU+QN5Svsuhymwx+R5WbSaK54ayEzmiNgzUsNTg69Xr8xx9TOTpjanhq6hEC
# AwEAAaNGMEQwDgYDVR0PAQH/BAQDAgeAMBMGA1UdJQQMMAoGCCsGAQUFBwMDMB0G
# A1UdDgQWBBQHqDMREHXNvffh3BCREKhjNlCx9DANBgkqhkiG9w0BAQsFAAOCAQEA
# O5lQEw1xE6fpZHdjw4SxvO+FIrDWgqF8NPpZD36h7Di5HDbtuX4NG6soLURsTzg/
# k5umGQz6tZ74ceKv7AdH5xE+NJYTq15xEMjpG4dIClQ96WOYog7LhZE7d6O+P9id
# 5iTqSV/TTSHSob9myoPT+TXRVlD07OG8gHazIJ+XAbuZ69kP6OgidPk2M4wDygYy
# gK5c1FWMUEkBVB4jBRivOzq+6UADLCauI2GmaRBeMi3ZFZtxuKhGis/u5BQzXGMG
# R7RE4CFnoPNI3weg7qqq6crAhgyfKSqAZoO52J2xyXhjXhouTPgdbKKMIqbQ3J8b
# uYw8M0227E+Gp9SfMgSOxTCCBY0wggR1oAMCAQICEA6bGI750C3n79tQ4ghAGFow
# DQYJKoZIhvcNAQEMBQAwZTELMAkGA1UEBhMCVVMxFTATBgNVBAoTDERpZ2lDZXJ0
# IEluYzEZMBcGA1UECxMQd3d3LmRpZ2ljZXJ0LmNvbTEkMCIGA1UEAxMbRGlnaUNl
# cnQgQXNzdXJlZCBJRCBSb290IENBMB4XDTIyMDgwMTAwMDAwMFoXDTMxMTEwOTIz
# NTk1OVowYjELMAkGA1UEBhMCVVMxFTATBgNVBAoTDERpZ2lDZXJ0IEluYzEZMBcG
# A1UECxMQd3d3LmRpZ2ljZXJ0LmNvbTEhMB8GA1UEAxMYRGlnaUNlcnQgVHJ1c3Rl
# ZCBSb290IEc0MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAv+aQc2je
# u+RdSjwwIjBpM+zCpyUuySE98orYWcLhKac9WKt2ms2uexuEDcQwH/MbpDgW61bG
# l20dq7J58soR0uRf1gU8Ug9SH8aeFaV+vp+pVxZZVXKvaJNwwrK6dZlqczKU0RBE
# EC7fgvMHhOZ0O21x4i0MG+4g1ckgHWMpLc7sXk7Ik/ghYZs06wXGXuxbGrzryc/N
# rDRAX7F6Zu53yEioZldXn1RYjgwrt0+nMNlW7sp7XeOtyU9e5TXnMcvak17cjo+A
# 2raRmECQecN4x7axxLVqGDgDEI3Y1DekLgV9iPWCPhCRcKtVgkEy19sEcypukQF8
# IUzUvK4bA3VdeGbZOjFEmjNAvwjXWkmkwuapoGfdpCe8oU85tRFYF/ckXEaPZPfB
# aYh2mHY9WV1CdoeJl2l6SPDgohIbZpp0yt5LHucOY67m1O+SkjqePdwA5EUlibaa
# RBkrfsCUtNJhbesz2cXfSwQAzH0clcOP9yGyshG3u3/y1YxwLEFgqrFjGESVGnZi
# fvaAsPvoZKYz0YkH4b235kOkGLimdwHhD5QMIR2yVCkliWzlDlJRR3S+Jqy2QXXe
# eqxfjT/JvNNBERJb5RBQ6zHFynIWIgnffEx1P2PsIV/EIFFrb7GrhotPwtZFX50g
# /KEexcCPorF+CiaZ9eRpL5gdLfXZqbId5RsCAwEAAaOCATowggE2MA8GA1UdEwEB
# /wQFMAMBAf8wHQYDVR0OBBYEFOzX44LScV1kTN8uZz/nupiuHA9PMB8GA1UdIwQY
# MBaAFEXroq/0ksuCMS1Ri6enIZ3zbcgPMA4GA1UdDwEB/wQEAwIBhjB5BggrBgEF
# BQcBAQRtMGswJAYIKwYBBQUHMAGGGGh0dHA6Ly9vY3NwLmRpZ2ljZXJ0LmNvbTBD
# BggrBgEFBQcwAoY3aHR0cDovL2NhY2VydHMuZGlnaWNlcnQuY29tL0RpZ2lDZXJ0
# QXNzdXJlZElEUm9vdENBLmNydDBFBgNVHR8EPjA8MDqgOKA2hjRodHRwOi8vY3Js
# My5kaWdpY2VydC5jb20vRGlnaUNlcnRBc3N1cmVkSURSb290Q0EuY3JsMBEGA1Ud
# IAQKMAgwBgYEVR0gADANBgkqhkiG9w0BAQwFAAOCAQEAcKC/Q1xV5zhfoKN0Gz22
# Ftf3v1cHvZqsoYcs7IVeqRq7IviHGmlUIu2kiHdtvRoU9BNKei8ttzjv9P+Aufih
# 9/Jy3iS8UgPITtAq3votVs/59PesMHqai7Je1M/RQ0SbQyHrlnKhSLSZy51PpwYD
# E3cnRNTnf+hZqPC/Lwum6fI0POz3A8eHqNJMQBk1RmppVLC4oVaO7KTVPeix3P0c
# 2PR3WlxUjG/voVA9/HYJaISfb8rbII01YBwCA8sgsKxYoA5AY8WYIsGyWfVVa88n
# q2x2zm8jLfR+cWojayL/ErhULSd+2DrZ8LaHlv1b0VysGMNNn3O3AamfV6peKOK5
# lDCCBq4wggSWoAMCAQICEAc2N7ckVHzYR6z9KGYqXlswDQYJKoZIhvcNAQELBQAw
# YjELMAkGA1UEBhMCVVMxFTATBgNVBAoTDERpZ2lDZXJ0IEluYzEZMBcGA1UECxMQ
# d3d3LmRpZ2ljZXJ0LmNvbTEhMB8GA1UEAxMYRGlnaUNlcnQgVHJ1c3RlZCBSb290
# IEc0MB4XDTIyMDMyMzAwMDAwMFoXDTM3MDMyMjIzNTk1OVowYzELMAkGA1UEBhMC
# VVMxFzAVBgNVBAoTDkRpZ2lDZXJ0LCBJbmMuMTswOQYDVQQDEzJEaWdpQ2VydCBU
# cnVzdGVkIEc0IFJTQTQwOTYgU0hBMjU2IFRpbWVTdGFtcGluZyBDQTCCAiIwDQYJ
# KoZIhvcNAQEBBQADggIPADCCAgoCggIBAMaGNQZJs8E9cklRVcclA8TykTepl1Gh
# 1tKD0Z5Mom2gsMyD+Vr2EaFEFUJfpIjzaPp985yJC3+dH54PMx9QEwsmc5Zt+Feo
# An39Q7SE2hHxc7Gz7iuAhIoiGN/r2j3EF3+rGSs+QtxnjupRPfDWVtTnKC3r07G1
# decfBmWNlCnT2exp39mQh0YAe9tEQYncfGpXevA3eZ9drMvohGS0UvJ2R/dhgxnd
# X7RUCyFobjchu0CsX7LeSn3O9TkSZ+8OpWNs5KbFHc02DVzV5huowWR0QKfAcsW6
# Th+xtVhNef7Xj3OTrCw54qVI1vCwMROpVymWJy71h6aPTnYVVSZwmCZ/oBpHIEPj
# Q2OAe3VuJyWQmDo4EbP29p7mO1vsgd4iFNmCKseSv6De4z6ic/rnH1pslPJSlREr
# WHRAKKtzQ87fSqEcazjFKfPKqpZzQmiftkaznTqj1QPgv/CiPMpC3BhIfxQ0z9JM
# q++bPf4OuGQq+nUoJEHtQr8FnGZJUlD0UfM2SU2LINIsVzV5K6jzRWC8I41Y99xh
# 3pP+OcD5sjClTNfpmEpYPtMDiP6zj9NeS3YSUZPJjAw7W4oiqMEmCPkUEBIDfV8j
# u2TjY+Cm4T72wnSyPx4JduyrXUZ14mCjWAkBKAAOhFTuzuldyF4wEr1GnrXTdrnS
# DmuZDNIztM2xAgMBAAGjggFdMIIBWTASBgNVHRMBAf8ECDAGAQH/AgEAMB0GA1Ud
# DgQWBBS6FtltTYUvcyl2mi91jGogj57IbzAfBgNVHSMEGDAWgBTs1+OC0nFdZEzf
# Lmc/57qYrhwPTzAOBgNVHQ8BAf8EBAMCAYYwEwYDVR0lBAwwCgYIKwYBBQUHAwgw
# dwYIKwYBBQUHAQEEazBpMCQGCCsGAQUFBzABhhhodHRwOi8vb2NzcC5kaWdpY2Vy
# dC5jb20wQQYIKwYBBQUHMAKGNWh0dHA6Ly9jYWNlcnRzLmRpZ2ljZXJ0LmNvbS9E
# aWdpQ2VydFRydXN0ZWRSb290RzQuY3J0MEMGA1UdHwQ8MDowOKA2oDSGMmh0dHA6
# Ly9jcmwzLmRpZ2ljZXJ0LmNvbS9EaWdpQ2VydFRydXN0ZWRSb290RzQuY3JsMCAG
# A1UdIAQZMBcwCAYGZ4EMAQQCMAsGCWCGSAGG/WwHATANBgkqhkiG9w0BAQsFAAOC
# AgEAfVmOwJO2b5ipRCIBfmbW2CFC4bAYLhBNE88wU86/GPvHUF3iSyn7cIoNqilp
# /GnBzx0H6T5gyNgL5Vxb122H+oQgJTQxZ822EpZvxFBMYh0MCIKoFr2pVs8Vc40B
# IiXOlWk/R3f7cnQU1/+rT4osequFzUNf7WC2qk+RZp4snuCKrOX9jLxkJodskr2d
# fNBwCnzvqLx1T7pa96kQsl3p/yhUifDVinF2ZdrM8HKjI/rAJ4JErpknG6skHibB
# t94q6/aesXmZgaNWhqsKRcnfxI2g55j7+6adcq/Ex8HBanHZxhOACcS2n82HhyS7
# T6NJuXdmkfFynOlLAlKnN36TU6w7HQhJD5TNOXrd/yVjmScsPT9rp/Fmw0HNT7ZA
# myEhQNC3EyTN3B14OuSereU0cZLXJmvkOHOrpgFPvT87eK1MrfvElXvtCl8zOYdB
# eHo46Zzh3SP9HSjTx/no8Zhf+yvYfvJGnXUsHicsJttvFXseGYs2uJPU5vIXmVnK
# cPA3v5gA3yAWTyf7YGcWoWa63VXAOimGsJigK+2VQbc61RWYMbRiCQ8KvYHZE/6/
# pNHzV9m8BPqC3jLfBInwAM1dwvnQI38AC+R2AibZ8GV2QqYphwlHK+Z/GqSFD/yY
# lvZVVCsfgPrA8g4r5db7qS9EFUrnEw4d2zc4GqEr9u3WfPwwggbCMIIEqqADAgEC
# AhAFRK/zlJ0IOaa/2z9f5WEWMA0GCSqGSIb3DQEBCwUAMGMxCzAJBgNVBAYTAlVT
# MRcwFQYDVQQKEw5EaWdpQ2VydCwgSW5jLjE7MDkGA1UEAxMyRGlnaUNlcnQgVHJ1
# c3RlZCBHNCBSU0E0MDk2IFNIQTI1NiBUaW1lU3RhbXBpbmcgQ0EwHhcNMjMwNzE0
# MDAwMDAwWhcNMzQxMDEzMjM1OTU5WjBIMQswCQYDVQQGEwJVUzEXMBUGA1UEChMO
# RGlnaUNlcnQsIEluYy4xIDAeBgNVBAMTF0RpZ2lDZXJ0IFRpbWVzdGFtcCAyMDIz
# MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAo1NFhx2DjlusPlSzI+DP
# n9fl0uddoQ4J3C9Io5d6OyqcZ9xiFVjBqZMRp82qsmrdECmKHmJjadNYnDVxvzqX
# 65RQjxwg6seaOy+WZuNp52n+W8PWKyAcwZeUtKVQgfLPywemMGjKg0La/H8JJJSk
# ghraarrYO8pd3hkYhftF6g1hbJ3+cV7EBpo88MUueQ8bZlLjyNY+X9pD04T10Mf2
# SC1eRXWWdf7dEKEbg8G45lKVtUfXeCk5a+B4WZfjRCtK1ZXO7wgX6oJkTf8j48qG
# 7rSkIWRw69XloNpjsy7pBe6q9iT1HbybHLK3X9/w7nZ9MZllR1WdSiQvrCuXvp/k
# /XtzPjLuUjT71Lvr1KAsNJvj3m5kGQc3AZEPHLVRzapMZoOIaGK7vEEbeBlt5NkP
# 4FhB+9ixLOFRr7StFQYU6mIIE9NpHnxkTZ0P387RXoyqq1AVybPKvNfEO2hEo6U7
# Qv1zfe7dCv95NBB+plwKWEwAPoVpdceDZNZ1zY8SdlalJPrXxGshuugfNJgvOupr
# AbD3+yqG7HtSOKmYCaFxsmxxrz64b5bV4RAT/mFHCoz+8LbH1cfebCTwv0KCyqBx
# PZySkwS0aXAnDU+3tTbRyV8IpHCj7ArxES5k4MsiK8rxKBMhSVF+BmbTO77665E4
# 2FEHypS34lCh8zrTioPLQHsCAwEAAaOCAYswggGHMA4GA1UdDwEB/wQEAwIHgDAM
# BgNVHRMBAf8EAjAAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMIMCAGA1UdIAQZMBcw
# CAYGZ4EMAQQCMAsGCWCGSAGG/WwHATAfBgNVHSMEGDAWgBS6FtltTYUvcyl2mi91
# jGogj57IbzAdBgNVHQ4EFgQUpbbvE+fvzdBkodVWqWUxo97V40kwWgYDVR0fBFMw
# UTBPoE2gS4ZJaHR0cDovL2NybDMuZGlnaWNlcnQuY29tL0RpZ2lDZXJ0VHJ1c3Rl
# ZEc0UlNBNDA5NlNIQTI1NlRpbWVTdGFtcGluZ0NBLmNybDCBkAYIKwYBBQUHAQEE
# gYMwgYAwJAYIKwYBBQUHMAGGGGh0dHA6Ly9vY3NwLmRpZ2ljZXJ0LmNvbTBYBggr
# BgEFBQcwAoZMaHR0cDovL2NhY2VydHMuZGlnaWNlcnQuY29tL0RpZ2lDZXJ0VHJ1
# c3RlZEc0UlNBNDA5NlNIQTI1NlRpbWVTdGFtcGluZ0NBLmNydDANBgkqhkiG9w0B
# AQsFAAOCAgEAgRrW3qCptZgXvHCNT4o8aJzYJf/LLOTN6l0ikuyMIgKpuM+AqNnn
# 48XtJoKKcS8Y3U623mzX4WCcK+3tPUiOuGu6fF29wmE3aEl3o+uQqhLXJ4Xzjh6S
# 2sJAOJ9dyKAuJXglnSoFeoQpmLZXeY/bJlYrsPOnvTcM2Jh2T1a5UsK2nTipgedt
# QVyMadG5K8TGe8+c+njikxp2oml101DkRBK+IA2eqUTQ+OVJdwhaIcW0z5iVGlS6
# ubzBaRm6zxbygzc0brBBJt3eWpdPM43UjXd9dUWhpVgmagNF3tlQtVCMr1a9TMXh
# RsUo063nQwBw3syYnhmJA+rUkTfvTVLzyWAhxFZH7doRS4wyw4jmWOK22z75X7BC
# 1o/jF5HRqsBV44a/rCcsQdCaM0qoNtS5cpZ+l3k4SF/Kwtw9Mt911jZnWon49qfH
# 5U81PAC9vpwqbHkB3NpE5jreODsHXjlY9HxzMVWggBHLFAx+rrz+pOt5Zapo1iLK
# O+uagjVXKBbLafIymrLS2Dq4sUaGa7oX/cR3bBVsrquvczroSUa31X/MtjjA2Owc
# 9bahuEMs305MfR5ocMB3CtQC4Fxguyj/OOVSWtasFyIjTvTs0xf7UGv/B3cfcZdE
# Qcm4RtNsMnxYL2dHZeUbc7aZ+WssBkbvQR7w8F/g29mtkIBEr4AQQYoxggT0MIIE
# 8AIBATAvMBsxGTAXBgNVBAMMEEFUQSBBdXRoZW50aWNvZGUCEHfR5WwKK921R5Vd
# DHGN7QAwCQYFKw4DAhoFAKB4MBgGCisGAQQBgjcCAQwxCjAIoAKAAKECgAAwGQYJ
# KoZIhvcNAQkDMQwGCisGAQQBgjcCAQQwHAYKKwYBBAGCNwIBCzEOMAwGCisGAQQB
# gjcCARUwIwYJKoZIhvcNAQkEMRYEFNZdi5/kvdVOKctZWQNAX5cjnTaoMA0GCSqG
# SIb3DQEBAQUABIIBAD7zWHjdUXtcQre4vgdDNQKHXn1qGlCeqW7qRywO9iPkGK/W
# /h5xjk+v7BpaFca2S95RHTqRzaVYgi5a2+0S+wa4+2fEh6jQ5IRxalr+FRuNT3Rv
# d636h8g+ZxlBUbFe3ogJm0nbt+OpioGDmtIETohPFxEJQxp+Vk+aYLseRuQ0BYaV
# olkQa8xBn6xdk04qHXlQKRT8gWar8L+AyNDM+m+WUYL5RC9uR7tciL3EYj5ApbK6
# eDoGbhWKgjd84dPP2CFqkTP19u+QhNjt7FcuZ+Zav+fHFt+u6SH7yPWTJqA7d5aI
# QsJig2/whBdupdnUxJkDenE0+dwG9Iy8CRCEsQyhggMgMIIDHAYJKoZIhvcNAQkG
# MYIDDTCCAwkCAQEwdzBjMQswCQYDVQQGEwJVUzEXMBUGA1UEChMORGlnaUNlcnQs
# IEluYy4xOzA5BgNVBAMTMkRpZ2lDZXJ0IFRydXN0ZWQgRzQgUlNBNDA5NiBTSEEy
# NTYgVGltZVN0YW1waW5nIENBAhAFRK/zlJ0IOaa/2z9f5WEWMA0GCWCGSAFlAwQC
# AQUAoGkwGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcN
# MjMxMjMwMDExNjM3WjAvBgkqhkiG9w0BCQQxIgQgmwacP0Br660yWl1X4RA1sR6o
# jX02wi2gAR8Rktn2OQIwDQYJKoZIhvcNAQEBBQAEggIAGkmXIdYk7KG5X6ZTRBVR
# SPmuR28jE97RB5ECysbdQl3qIOBAMQGTHgxRS8bKKMAonvg3TbFZ0SYUOCQ/w9Z8
# 7z3ZhnpIDNS5tcot2TnY8h+VgfBIYouewzU2WDMdI9ZI8bFNHIHBU4NNzyCCDY2q
# WaOANP8BGvSJV5DTXpzvow0ivlMBYodJiLuCnmtT08wM+b1o830zfMuqTuul2uko
# MVXjJcpCDI5B9J+KdAleEQjcDknBIgMdoq1yvuJebsMqRLaD5jrBQFLRHwaI4VR8
# WmVZ7fantlXalf+IqmhHprjfG2opOBS/naAG9pHlXtRiP3DigEIMwoIYWVczXDOP
# Wilfv4T7ofow1pbGsX3Jfe5i8/GfEmM0rmEH/pGCkeyiKUv65fnrO3+nBlygFHFD
# vYQmB/gGnlnQWCle71xH4fjzVrQnyWwzq2dLn9iX9ktNMIMaZ05/HiafRAvotqpI
# yVgF0MTUc0Scg76m63CjJodHa62PqWw2wS1wlbAAyEB7MJyWOFXROJtFNQ/L6Y2M
# gSotmSjTNhy3pBkRdDILCSnWbgj3Ms6R/sjEozKPsEGuP4q1iguvY1TqeZ2eB/Aa
# bkjVun6K6ruV9G2KZqiUT2GHVIpfI/qSpLWBZtIf3jmfiBUHDfkcDPCfsRlAOWaV
# /0aXruK42RHNO6e77YM5UWE=
# SIG # End signature block
