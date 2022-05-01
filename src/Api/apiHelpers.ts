//@ts-ignore
import PaginationHelper from "@jalik/pagination-helper";
import { Sideyard, UpdateBundle } from "../Components/types";
import API from "./api";

const relevantFields =
  "fields=updated_at%2CcleanAddress%2CstreetViewFilePath%2CshouldCanvass%2C%2CwasCanvassed%2CshouldNotCanvass%2Ccomment";
const limit = "limit=50";

export const getAllData = async () => {
  const { count: total = 473 }: { count?: number } = await API.get(
    `${process.env.REACT_APP_TABLE}/count`
  );

  const pagination = new PaginationHelper({
    limit: 50,
    offset: 0,
    total,
  });

  let sideyards: Sideyard[] = [];

  for (let i = 0; i < 1; i += 1) {
    const currentOffsetNumber = pagination.getOffset();
    const currentOffset = `offset=${currentOffsetNumber}`;

    const response = await API.get(
      `${process.env.REACT_APP_TABLE}?${relevantFields}&${limit}&${currentOffset}`
    );

    const processedData: Sideyard[] =
      response.data?.map((sideyard: Sideyard): Sideyard => {
        const firstRemoved = sideyard.streetViewFilePath.slice(1);

        return {
          ...sideyard,
          streetViewFilePath: `${process.env.REACT_APP_BUCKET_PUBLIC}${firstRemoved}`,
        };
      }) || [];

    sideyards = [...sideyards, ...processedData];

    pagination.setOffset(currentOffsetNumber + pagination.getLimit());
  }

  return sideyards;
};

export const updateSideyardCall = async (updateBundle: UpdateBundle) => {
  const { id, ...body } = updateBundle;

  const response = await API.put(`${process.env.REACT_APP_TABLE}/${id}`, body);

  if (response.status === 200) {
    const { data } = response;
    const firstRemoved = data.streetViewFilePath.slice(1);

    return {
      ...data,
      streetViewFilePath: `${process.env.REACT_APP_BUCKET_PUBLIC}${firstRemoved}`,
    };
  }

  return null;
};
