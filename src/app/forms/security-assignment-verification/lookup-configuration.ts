export interface ISecurityItemLookupConfiguration {
    SerializedType: string;
    LookupBrowserFields: string;
    LookupDialogFilterFields: string;
    LookupDialogFilterOperators: string;
    LookupDialogQuerySort: string;
    LookupDialogQueryString: string;
    LookupDialogTitle: string;
    LookupEntityName: string;
    LookupEntityTable: string;
    LookupKeyField: string;
    LookupKeyValueColumn: string;
    LookupQueryString: string;
} 

export interface IAssignmentConfiguration {
    IsRestricted: boolean,
    Reason: string,
    Runtime: number,
    Groups: [{
        GroupName: string,
        LoginCompanyName?: string,
        ParentGroupName?: string
    }]
}

export interface IGridGroup {
    Order: number,
    GroupName: string,
    LoginCompany: string
}