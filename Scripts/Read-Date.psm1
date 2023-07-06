function Read-Date {
    param (
        $MdHeader
    )

    # extract just the date
    $date = $MdHeader.Substring($MdHeader.IndexOf(", "))
    $date = $date.Substring(2)
    
    # get date parts and return as final date obj
    $month = $date.Substring(0, $date.IndexOf("/"))
    $dateTrimmedMonth = $date.Substring($date.IndexOf("/") + 1)
    $day = $dateTrimmedMonth.Substring(0, $dateTrimmedMonth.IndexOf("/"))
    $dateTrimmedDay = $dateTrimmedMonth.Substring($dateTrimmedMonth.IndexOf("/") + 1)
    $year = $dateTrimmedDay

    return Get-Date -Month $month -Day $day -Year $year -Hour 0 -Minute 0 -Second 0 -Millisecond 0
}