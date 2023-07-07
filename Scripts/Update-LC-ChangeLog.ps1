class ChangeLog_Details {
    [DateTime]$LastModified
    [string]$Date
    [string]$Category
    [string]$RelativePath

    File_ModDate([string]$fn, [string]$category, [string]$relativePath, [DateTime]$lm) {
        $this.FileName = $fn
        $this.Category = $category
        $this.RelativePath = $relativePath
        $this.LastModified = $lm
    }
}

# if any changes were made on a given day, log those changes as a line under given day's header

# get the file reference 
function Update-LC-ChangeLog {
    
}