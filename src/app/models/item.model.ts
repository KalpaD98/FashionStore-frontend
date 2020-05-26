export enum ItemCategory {
  Women = 'Women',
  Men = 'Men',
  Unisex = 'Unisex',
  Kids = 'Kids',
  Sports = 'Sports',
  Other = 'Other',
}

export interface Item {
  _id?:string
  itemId?: string,
  title: string,
  category: ItemCategory,
  type: string
  price: number,
  description: string,
  imagePaths: [string] | string,
  quantity: number,
  averageRating?: boolean | number,
  numberOfRatings?: number,
  creator?: string
}
