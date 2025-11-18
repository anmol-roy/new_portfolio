"use client";
import BucketList from "../../components/pages/BucketList";
import BackButton from "../../components/BackButton";

export default function BucketListPage() {
  return (
    <>
      <BackButton />
      <main>
        <BucketList />
      </main>
    </>
  );
}
