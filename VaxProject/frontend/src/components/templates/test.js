<Dialog open={open_edit} onClose={handleCloseEdit}>
<DialogTitle>Edit Food Item</DialogTitle>
<DialogContent>
    <TextField
        autoFocus
        margin="dense"
        label="Item Name"
        fullWidth
        disabled
        variant="standard"
        value={item_name}
        onChange={onChangeItemName}
    />
    <TextField
        margin="dense"
        label="Price"
        fullWidth
        variant="standard"
        value={price}
        onChange={onChangePrice}
    />

    <FormControlLabel control={<Switch
        onChange={onChangeVegStatus}
        defaultChecked
        inputProps={{ 'aria-label': 'controlled' }}
    />} label="Veg" />

    <TextField
        autoFocus
        margin="dense"
        label="Add ons"
        fullWidth
        variant="standard"
        value={add_on}
        onChange={onChangeAddOns}
    />
    <TextField
        autoFocus
        margin="dense"
        label="Tags"
        fullWidth
        variant="standard"
        value={tags}
        onChange={onChangeTags}
    />

</DialogContent>
<DialogActions>
    <Button onClick={handleCloseEdit}>Cancel</Button>
    <Button onClick={EditFoodItem}>Edit</Button>
</DialogActions>
</Dialog>
