. ./Scripts/Overwrite-Readme.ps1 # dot source external script to overwrite readme

# ----------------------- README.md: ------------------------ #
    # displays all leetcode files, categorized by difficulty
    # runs through full file list, excluding non-leetcode files and adds them to its category list
    # this helps me have easy links to navigate from the README.md
    # also contains links to LastModified.md and ChangeLog.md

# example hashtable:
# Easy - [f4.js]
# Medium - [f3.js,f5.js]
# Hard - [f1.js, f2.js]

# object containing file name and its relative path in the repo
class FileNameRelPath {
    [string]$FileName
    [string]$RelPath

    FileNameRelPath([string]$fn, [string]$rp) {
        $this.FileName = $fn
        $this.RelPath = $rp
    }
}

function Update-LC-ReadMe {
    Write-Host "In Update-LC-ReadMe."
    Write-Host "Repo path: $repoPath" # print the path of repo
    
    $filePath # variable to store readme path
    $categoryTable = @{} # store dictionary categories with list of files
    $count = 0 # num files processed

    # search for last modified file and if found, set file found to true and file path to the path
    Get-ChildItem -Path "$repoPath" | ForEach-Object { 
        if ($_.BaseName -eq "README") {
            $fileFound = $true
            $filePath = $_.FullName
        }
    }

    ((Get-ChildItem -Path $repoPath -Exclude "*.git*","*.md","*.txt","Node*","Scripts*","*.ps1","*.psm1","*.json") | # exclude irrelevant file types
        Get-ChildItem -Recurse -File | ForEach-Object {

            $count++ # increment num file processed 
            
            # extract relative path and category from file full path
            $category
            $relativePath

            # get relative directory of file location
            $fullPath = $_.FullName
            $relativePath = $fullPath.Substring($fullPath.IndexOf("leetcodeDSAjs"))
            if ($relativePath.IndexOf("\") -gt 0) {
                $relativePath = $relativePath.Substring($relativePath.IndexOf("\") + 1);
            }
            if ($relativePath.IndexOf("\") -gt 0) {
                $category = $relativePath.Substring(0, $relativePath.IndexOf("\"))
            }
            $relativePath = $relativePath -replace "\\", "/"

            if (!$category -or $category -like "Misc" -or $category -like "img") {
                $category = "Misc"
            }

            # create new file object with file name and its relative path 
            $newFileObj = [FileNameRelPath]::new(
                $_.BaseName,
                $relativePath
            )

            if (!$categoryTable.ContainsKey($category)) { # if the table doesn't contain this sunday, add it as a key with a value of List<File_ModDate>
                $newList = (New-Object System.Collections.Generic.List[FileNameRelPath])
                $newList.Add($newFileObj)
                $categoryTable.Add($category, $newList)
            } else {
                $existingList = $categoryTable[$category]
                $existingList.Add($newFileObj)
                $categoryTable[$category] = $existingList
            }
        })

    Write-Host "Number of files processed: $count"
    
    $categoryTable.GetEnumerator() | ForEach-Object {
        $count = 0
        Write-Host "Number of files in category $($_.Key):"
        $($_.Value | ForEach-Object {
            $count++
        })
        Write-Host $count
    }

    Overwrite-ReadMe -RepoPath $repoPath -FilePath $filePath -CategoryTable $categoryTable

    # update change log with current date of overwrite
    $overwriteDate = Get-Date -DisplayHint Date

    # create ChangeLog object
    $changeLogObj = [ChangeLog]::new(
        "README.md", # file name
        $overwriteDate, # overwrite date
        "Rewrote README.md" # in the future, this description can be more useful
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

Update-LC-ReadMe

# SIG # Begin signature block
# MIIbnQYJKoZIhvcNAQcCoIIbjjCCG4oCAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUj9aQGKyHdCB6XXYnB0uZslq+
# TwugghYTMIIDBjCCAe6gAwIBAgIQd9HlbAor3bVHlV0McY3tADANBgkqhkiG9w0B
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
# gjcCARUwIwYJKoZIhvcNAQkEMRYEFDkYtx2XRyFnCVi5QcZ1EqgrpusLMA0GCSqG
# SIb3DQEBAQUABIIBAFGB0B1e2rY8YtuipuaMkT/xcEQpgYMRa/2erwJGzb2thhMP
# Dn13AEWKlDmqq7lkRD1CNYD2AB8KaiRlRohMA160S9g/U2b/8W3SIYJjToONV3LF
# EMzpYORJ5BaFAq4QrCEBo1T0dAHA99kF9kWe2+MIkYAzAidxpPmhPBoigwA+gGBY
# /rQlKUdxhrAXNIucP7E2mURAKNHNosnokFh0/rk1RQcSApewVApFSTRTt1cSFpe7
# 9wRUbdasyDr+ss2XT/pdme85QI7JQCUN2JIRoV6a6jcu3ce8C9VQ10LbaZWztj7m
# S0sGQnxhW0NnGhNcXXBtIV+6iozUTpu7g2sN892hggMgMIIDHAYJKoZIhvcNAQkG
# MYIDDTCCAwkCAQEwdzBjMQswCQYDVQQGEwJVUzEXMBUGA1UEChMORGlnaUNlcnQs
# IEluYy4xOzA5BgNVBAMTMkRpZ2lDZXJ0IFRydXN0ZWQgRzQgUlNBNDA5NiBTSEEy
# NTYgVGltZVN0YW1waW5nIENBAhAFRK/zlJ0IOaa/2z9f5WEWMA0GCWCGSAFlAwQC
# AQUAoGkwGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcN
# MjMxMjMwMDExNjUwWjAvBgkqhkiG9w0BCQQxIgQgtZRjVx5ybhaQ+MLWzy9fIbU3
# sj3/B92slMBJP+LbSkMwDQYJKoZIhvcNAQEBBQAEggIADeEK2zO5CJlNIHqTEuN4
# cfG9kf/9QkD8jGeS890R4KqSfdl18XUhXNJ9/d/ciXEmWbPXauFFMhFQGbsxV3bT
# Xf6romERgWhZfpb6wWSQAjtNk7rrJotrRsc0HVKNiqu7jBzfI+Kv89PKnp+kfWkM
# w3XaWVwAdQIlWth5BVhzLZpO0wp5dlzIu7YQkITL25XCgwFZwEw+PRF72e5MmrU9
# nP0PIzY23+drlEy46zyT9rw1N0ooeDjYD+TVhCmGEYi6Bo7vvD/79xJfhrTI3zIk
# ss0YZ3ZomJ82OatcIuIgBbTVWcjQLvXZaeoxObLL+EohT4F0WBkjf2Tdr/T3tMfu
# oc831Xv8Vs6kXXEpu4O23H37qlna0XclYX0IKolZj83bA9+XL281cLXXzS4UJjlM
# ebBAt7V7AaTyQNj/z1WPGBG7fCvkZ/iE67mbMDcOsnO2S8zBflc4UPFtJiMeGAMk
# qlQrPheqelFRV1d9jZkbRbiMIQeCl3Ich8++GTO0qF4CkKLqLf2YtpfVCAcnjza2
# mlABMrsiCTYV2IXu4WOUHZFV9vG761Vh1/3akIQ3MnvWIXMHeuX4VM1bOfyhQD42
# CvU0wPX+3zL7G1nylkd29VK2TCCgQwdicpfDh+PC0Mnpizqg1J6v4PUH7n1cGmiu
# CX334TWLP1BIfL5BkM8aGzA=
# SIG # End signature block
