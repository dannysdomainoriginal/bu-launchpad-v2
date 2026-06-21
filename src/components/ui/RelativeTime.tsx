"use client";

import moment from "moment";

type Props = {
  date: string | Date;
};

export function RelativeTime({ date }: Props) {
  return <>{moment(date).fromNow()}</>;
}
