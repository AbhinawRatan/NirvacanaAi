import axios from "axios";
import { DAS } from "helius-sdk";

export const getAssetsByGroup = async (
  collection: string,
  rpc_url: string,
  fetchAll: boolean,
) => {
  let page = 1;
  const assetList: DAS.GetAssetResponse[] = [];

  let complete = false;

  while (!complete) {
    try {
      const response = await axios.post(
        rpc_url,
        {
          jsonrpc: "2.0",
          id: "my-id",
          method: "getAssetsByGroup",
          params: {
            groupKey: "collection",
            groupValue: collection,
            page: page,
            limit: 1000,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = response.data;

      const { result } = data as {
        result: { items: DAS.GetAssetResponse[]; total: number };
      };

      if (!fetchAll) {
        complete = true;
      }

      assetList.push(...result.items);
      if (result.total !== 1000) {
        complete = true;
      } else {
        page++;
      }
    } catch (error) {
      console.log(error);
    }
  }
  const resultData: DAS.GetAssetResponse[] = assetList;

  return resultData;
};
