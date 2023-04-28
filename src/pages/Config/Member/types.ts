export enum Member {
    driver = 'ROLE_DRIVER',
    allo = 'ROLE_COLLECTOR',
    loader = 'ROLE_LOADER'
}
export const MemberWord = {
    [Member.driver]: '司机',
    [Member.allo]: '采购员',
    [Member.loader]: '配货员'
}
export const AllMember = [Member.driver, Member.allo, Member.loader]