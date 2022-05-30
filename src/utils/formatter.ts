import { AuthDocument, ProfileDocument } from "./types"

type IDataTypes = AuthDocument & ProfileDocument;
export const DataFormatter = <IData extends IDataTypes>(data: IData) => {
  return {
    format(type: "user") {
      if (type === "user") return {
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        display_name: data.display_name,
        email: data.email,
      }
    }
  }
}