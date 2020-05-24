enum ItemCategory{
  Women= "Women",
  Men= "Men",
  Unisex= "Unisex",
  Kids= "Kids",
  Sports= "Sports",
  Other= "Other",
}

export interface Item {
  itemName:string,
  itemCategory:ItemCategory,
  itemType:string
  price:number,
  description:string,
  itemImagesPath:[string] | string,
  itemQuantity:number,
  averageRating?:boolean|number,
  creator:string
}
