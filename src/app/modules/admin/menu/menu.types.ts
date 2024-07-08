export interface CustomerProduct {
    id: string;
    category?: string;
    name: string;
    description?: string;
    tags?: string[];
    sku?: string | null;
    barcode?: string | null;
    brand?: string | null;
    vendor: string | null;
    stock: number;
    reserved: number;
    cost: number;
    basePrice: number;
    taxPercent: number;
    price: number;
    weight: number;
    thumbnail: string;
    images: string[];
    active: boolean;
}
export interface CustomerPagination {
    length: number;
    size: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
    pagination: {
        page: number,
        pageSize: number,
        pageCount: number,
        total: number
    }
}

export interface PositionCategory {
    id: string;
    parentId: string;
    name: string;
    slug: string;
}

export interface PositionBrand {
    id: string;
    name: string;
    slug: string;
}

export interface PositionTag {
    id?: string;
    title?: string;
}

export interface PositionVendor {
    id: string;
    name: string;
    slug: string;
}


export interface PositionProduct {
    data: {
        id: number;
        attributes: {
            order_name: string;
            lot: string;
            deadline_for_store_order: string;
            delivery_date_warehouse: string;
            delivery_date_store: string;
            asset_type: {
                data: {
                    id: number,
                    attributes: {
                        name: string;
                    }
                }
            },
            available: string;
            total_cost: number,
            brief_date: string;
            translation_cost: number,
            artwork_cost: number,
        }
    }
}

export interface PositionProductDetail {
    id: string,
    attributes: {
        order_name: string;
        lot: string;
        deadline_for_store_order: string;
        delivery_date_warehouse: string;
        delivery_date_store: string;
        asset_type: {
            data: {
                id: number,
                attributes: {
                    name: string;
                    asset_sizes: {
                        data: {
                            attributes: {
                                name: string;
                                size: string;
                            }
                        }
                    }
                }
            }
        }
        available: string;
        total_cost: number;
        brief_date: string;
        translation_cost: string;
        artwork_cost: string;
        status: string;
        createdAt: string;
        updatedAt: string;
        translation_supplier_id: {
            data: {
                attributes: {
                    username: string;
                    email: string;
                    provider: string;
                    confirmed: string;
                    blocked: string;
                    firstname: string;
                    lastname: string;
                }
            }
        },
        artwork_supplier_id: {
            data: {
                attributes: {
                    username: string;
                    email: string;
                    provider: string;
                    confirmed: string;
                    blocked: string;
                    firstname: string;
                    lastname: string;
                }
            }
        },
        production_supplier_id: {
            data: {
                attributes: {
                    username: string;
                    email: string;
                    provider: string;
                    confirmed: string;
                    blocked: string;
                    firstname: string;
                    lastname: string;
                }
            }
        },
        assets:
        {
            data: [
                {
                    id: number,
                    attributes: {
                        name: string;
                        printing_cost: string;
                        reference: string;
                        expire_date: string;
                        content: string;
                        size: string,
                        season: string;
                        asset_type_code: string;
                        division: string;
                        number: string;
                        store_type: string;
                        asset_code: string;
                        asset_status: string;
                        project: string;
                        item: {
                            data: {
                                id: number;
                                attributes: {
                                    item_code: string;
                                    item_name: string;
                                    sum_code: string;
                                    season: string;
                                    division: string;
                                    launching_date: string;
                                    store_type: string;
                                    price: string;
                                    size_for_store: string;
                                    size_for_ec: string;
                                    panel: string;
                                    promotion: string;
                                }
                            }
                        },
                        asset_artworks: {
                            data: []
                        },
                        asset_comments: {
                            data: [
                                {
                                    id: number,
                                    attributes: {
                                        message: string;
                                        createdAt: string;
                                        updatedAt: string;
                                        user_id: {
                                            data: {
                                                id: 5,
                                                attributes: {
                                                    username: string;
                                                    email: string;
                                                    provider: string;
                                                    confirmed: boolean,
                                                    blocked: boolean,
                                                    firstname: string;
                                                    lastname: string;
                                                    createdAt: string;
                                                }
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            ],
        },
        brief_translation_files: {
            data: [
                {
                    id: number,
                    attributes: {
                        file: {
                            data: {
                                id: number,
                                attributes: {
                                    name: string;
                                    size: string;
                                    ext: string;
                                    mime: string;
                                    url: string;
                                }
                            }
                        }
                    }
                }
            ]
        },
        brief_file: {
            data: {
                attributes: {
                    name: string;
                    size: string;
                    ext: string;
                    mime: string;
                    url: string;
                }
            }
        }
    }
}

export interface PositionProductDetailOSM {
    id: string,
    attributes: {
        order_name: string;
        name: string;
        lot: string;
        deadline_for_store_order: string;
        delivery_date_warehouse: string;
        delivery_date_store: string;
        asset_type: {
            data: {
                id: number,
                attributes: {
                    name: string;
                    asset_sizes: {
                        data: {
                            attributes: {
                                name: string;
                                size: string;
                            }
                        }
                    }
                }
            }
        }
        available: string;
        total_cost: number;
        brief_date: string;
        start_date: string;
        translation_cost: string;
        artwork_cost: string;
        status: string;
        createdAt: string;
        updatedAt: string;
        installation: boolean;
        translation_supplier_id: {
            data: {
                attributes: {
                    username: string;
                    email: string;
                    provider: string;
                    confirmed: string;
                    blocked: string;
                    firstname: string;
                    lastname: string;
                }
            }
        },
        artwork_supplier_id: {

            data: {
                id: number,
                attributes: {
                    username: string;
                    email: string;
                    provider: string;
                    confirmed: string;
                    blocked: string;
                    firstname: string;
                    lastname: string;
                }
            }
        },
        production_supplier_id: {
            data: {
                id: number,
                attributes: {
                    username: string;
                    email: string;
                    provider: string;
                    confirmed: string;
                    blocked: string;
                    firstname: string;
                    lastname: string;
                }
            }
        },
        brief_osm_stores:
        {
            data: [
                {
                    id: number,
                    attributes: {
                        name: string;
                        printing_cost: string;
                        reference: string;
                        expire_date: string;
                        content: string;
                        size: string,
                        season: string;
                        asset_type_code: string;
                        division: string;
                        number: string;
                        store_type: string;
                        asset_code: string;
                        asset_status: string;
                        project: string;
                        brief_osm_store_files: {
                            data: [{
                                id: number;
                                attributes: {
                                    status: string;
                                }
                            }]
                        },
                        item: {
                            data: {
                                id: number;
                                attributes: {
                                    item_code: string;
                                    item_name: string;
                                    sum_code: string;
                                    season: string;
                                    division: string;
                                    launching_date: string;
                                    store_type: string;
                                    price: string;
                                    size_for_store: string;
                                    size_for_ec: string;
                                    panel: string;
                                    promotion: string;
                                }
                            }
                        },
                        asset_artworks: {
                            data: []
                        },
                        asset_comments: {
                            data: [
                                {
                                    id: number,
                                    attributes: {
                                        message: string;
                                        createdAt: string;
                                        updatedAt: string;
                                        user_id: {
                                            data: {
                                                id: 5,
                                                attributes: {
                                                    username: string;
                                                    email: string;
                                                    provider: string;
                                                    confirmed: boolean,
                                                    blocked: boolean,
                                                    firstname: string;
                                                    lastname: string;
                                                    createdAt: string;
                                                }
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            ],
        },
        brief_translation_files: {
            data: [
                {
                    id: number,
                    attributes: {
                        file: {
                            data: {
                                id: number,
                                attributes: {
                                    name: string;
                                    size: string;
                                    ext: string;
                                    mime: string;
                                    url: string;
                                }
                            }
                        }
                    }
                }
            ]
        },
        brief_file: {
            data: {
                attributes: {
                    name: string;
                    size: string;
                    ext: string;
                    mime: string;
                    url: string;
                }
            }
        }
    }
}

export interface Contact {
    id?: string;
    avatar?: string;
    name?: string;
    about?: string;
    details?: {
        emails?: {
            email?: string;
            label?: string;
        }[];
        phoneNumbers?: {
            country?: string;
            phoneNumber?: string;
            label?: string;
        }[];
        title?: string;
        company?: string;
        birthday?: string;
        address?: string;
    };
    attachments?: {
        media?: any[];
        docs?: any[];
        links?: any[];
    };
}

export interface Chat {
    id?: string;
    contactId?: string;
    contact?: Contact;
    unreadCount?: number;
    muted?: boolean;
    lastMessage?: string;
    lastMessageAt?: string;
    messages?: {
        id?: string;
        chatId?: string;
        contactId?: string;
        isMine?: boolean;
        value?: string;
        createdAt?: string;
    }[];
}

export interface AssetType {

    id: string;
    name: string,
    asset_sizes: [
        {
            id: number,
            name: string,
            size: string,
        }
    ]
}

export interface AssetSize {
    data: [
        {
            id: string;
            name: string,
            size: string,
            asset_material:
            {
                id: number,
                name: string,
            },
            asset_type:
            {
                id: number,
                name: string,
            }
        }
    ]
}


export interface NewPermission {
    data: {
        order_name: string;
        lot: string;
        deadline_for_store_order: string;
        delivery_date_warehouse: string;
        delivery_date_store: string;
        asset_type: string;
        available: string;
        total_cost: string;
        brief_date: string;
        translation_cost: string;
        artwork_cost: string;
        translation_supplier_id: string;
        artwork_supplier_id: string;
        production_supplier_id: string;
        assets: {
            data: {
                id: string,
                name: string,
                printing_cost: string,
                expire_date: string,
                content: string,
                asset_name: string,
                size: string,
                store_type: string,
                reference: string,
                item: string,
                number: string,
            }
        },
        status: string;
        translation_file: string;
        brief_file: string;
    }
}

export interface NewPosition {
    id: string;
    name: string;

}

export interface NewItemListCheckingProduct_PROD {

    id: string;
    season: string;
    division: string;
    sum_code: string;
    item_code: string;
    item_name: string;
    launching_date: string;
    store_type: string;
    thumbnail: string;
    images: string[];
    active: boolean;
}

export interface NewItemListCheckingProduct_PROD2 {
    data: {
        attributes: {
            id: string;
            season: string;
            division: string;
            sum_code: string;
            item_code: string;
            item_name: string;
            launching_date: string;
            store_type: string;
            thumbnail: string;
            images: string[];
            active: boolean;
        }
    }
}

export interface Supplier {
    id?: string;
    username?: string;
    firstname?: string;
    lastname?: string;
    provider?: string;
    email?: string;
    confirmed?: string;
    createdAt?: string;
    updatedAt?: string;
    role: {
        id?: string;
        name: number,
        type: number,
        description: number,
        createdAt: number
    }
}


export interface AssetItem {
    data: [
        {
            id: number,
            attributes: {
                item_code: number,
                item_name: string;
                sum_code: 440426,
                season: string;
                division: 24,
                launching_date: string;
                store_type: string;
                price: 290,
                size_for_store: string;
                size_for_ec: string;
                panel: string;
                promotion: string;
            }
        }
    ],
    meta: {
        pagination: {
            page: number,
            pageSize: number,
            pageCount: number,
            total: number
        }
    }
}

export interface StoreType {

    id: string;
    attributes: [
        {
            id: number,
            name: string,
            size: string,
        }
    ]

}

export interface Store {
    id: string;
    name: string,
    short_name: string,
    code: string,
    active: string,
    bangkok_metropolitan_region_store: string,
}


// export interface AssetSize {
//     data: [
//         {
//             id: string;
//             name: string,
//             size: string,
//             asset_type: [
//                 {
//                     id: number,
//                     name: string,
//                 }
//             ]
//         }
//     ]
// }

export interface Division {
    id: string,
    code: string,
    name: string,
}

export interface PermissionTable {
    data: PositionProduct[],

}

export interface DataCustomer {
    data: [
        {
            id: number,
            name: string,
            contact: string,
            email: string,
            phone: number,
            adress: string,
            status: number,
            create_by: number,
            update_by: string,
            created_at: Date,
            updated_at: Date,
            No: number
        }
    ]
}

export interface Item {
    id:           number;
    item_type_id: number;
    item_id:      string;
    name:         string;
    image:        string;
    unit_price:   number;
    unit_cost:    number;
    location_id:  number;
    vendor_id:    number;
    barcode:      string;
    brand:        string;
    description:  string;
    status:       number;
    create_by:    string;
    update_by:    null;
    created_at:   Date;
    updated_at:   Date;
    No:           number;
    qty:          number;
    item_type:    ItemType;
    location:     Location;
    item_line:    null;
}

export interface ItemType {
    id:            number;
    name:          string;
    code:          string;
    status:        number;
    create_by:     string;
    update_by:     null;
    created_at:    Date;
    updated_at:    Date;
    warehouse_id?: number;
}

export interface Location {
    id:           number;
    warehouse_id: number;
    code:         string;
    name:         string;
    status:       number;
    create_by:    string;
    update_by:    null;
    created_at:   Date;
    updated_at:   Date;
}
