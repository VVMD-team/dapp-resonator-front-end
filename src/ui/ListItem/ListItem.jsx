export default function ListItem({ item, id, type }) {
  if (item.name.toUpperCase() === "DEFAULT") {
    return null;
  }

  const isFile = type === "file";
  const itemSize = item.size / (1024 * 1024); // Convert to Megabite 
  const itemSizeRounded =
    itemSize > 1 ? itemSize.toFixed(2) : itemSize.toFixed(6);
  let itemName = item.name.split(".").slice(0, -1).join(".");
  let fileMimetype;
  if (isFile) {
    if (itemName.length > 32) {
      // Limit file name to 32 symbols
      itemName = itemName.slice(0, 9) + " ... " + itemName.slice(-9);
    }
    fileMimetype = item.mimetype.split("/")[1];
    if (fileMimetype.length > 12) {
      // Limit file mimetype to 12 symbols
      fileMimetype = fileMimetype.slice(-12);
    }
  } else {
    itemName = item.name;
  }

  const isFirst =
    !isFile &&
    item.name.toUpperCase() !== "DEFAULT" &&
    (item.name.toUpperCase() === "TRANSFERED" ||
      item.name.toUpperCase() === "SHARED");

  return (
    <div
      data-search-field-wrapper=""
      className={`files-item_component ${isFile ? "is-file" : "is-box"} ${
        isFirst ? "is-first" : ""
      }`}
    >
      <div className="file-item_content">
        <div
          className={`files-item_icon ${isFile ? "is-file" : "is-box"}`}
        ></div>
        <div className="files-item_text">
          <div data-search-field="" className="files-item_caption">
            {itemName}
          </div>
          <div className="files-item_description">
            {isFile ? (
              <>
                <span>{fileMimetype}</span>
                <span>&nbsp;— </span>
                <span>{itemSizeRounded}mb</span>
              </>
            ) : (
              <>
                <span>{item.fileIds.length} files</span>
                <span>&nbsp;— </span>
                <span>{itemSizeRounded}mb</span>
              </>
            )}
          </div>
        </div>
        <a
          href={isFile ? `/files/inspector/${id}` : `/boxes/inspector/${id}`}
          className={`${isFile ? "files-item_more" : "file-item_box-link"}`}
        ></a>
      </div>
      {!isFile && (
        <a
          href={isFile ? `/files/inspector/${id}` : `/boxes/inspector/${id}`}
          className="files-item_more"
        ></a>
      )}
    </div>
  );
}
