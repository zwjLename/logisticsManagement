import { PurchaseType } from "@/pages/Manipulate/typings";

declare namespace API {
    export interface getPickAllocationListByTodayParams {
        pickUserTel: string;
        pickState: PurchaseType
    }
    export interface getPickAllocationListByTodayRes{
        "allocationNum": number,
        "allocationTime": string,
        "hopeRcvTime": string,
        "id": string,
        "pickFlag": string,
        "pickLatitude": string,
        "pickLongitude": string,
        "pickUserTel": string,
        "repoInTime": string,
        "repoLatitude": string,
        "repoLongitude": string,
        "userId": number,
        "vehicleNum": string
      }
}