export const storeAddResponseDTO = (data) => {
    return {"region": data[0].regionName, "storeName": data[0].storeName};
}