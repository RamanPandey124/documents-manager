<form action={handleForm} className="m-2">
    <InputBox type="hidden" name="content" value={value} />
    <InputBox type="hidden" name="uniquePath" value={file.filePath} />
    <InputBox type="hidden" name="fileId" value={file._id} />
    <SubmitBtn title="Save Changes" />
</form>