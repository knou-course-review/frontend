"use client";

import { useState, type FormEvent } from "react";
// import { redirect } from "next/navigation";
import { Button, Checkbox, FormControlLabel, FormHelperText } from "@mui/material";
// import { terminateAccount } from "@/actions/account-termination";

export default function TerminationForm() {
  const [error, setError] = useState<{ isChecked?: string[] }>({});
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const checkedStatus = formData.get("agreementCheck");
    const data = { isChecked: checkedStatus === "on" };
    // const res = await terminateAccount(data);

    // if (res?.isValid) {
    //   redirect("/");
    // }
    // if (res.errors?.isChecked) {
    //   setError(res.errors);
    // }
  };
  return (
    <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
      <div>
        <FormControlLabel
          label="회원 탈퇴에 대한 안내 사항을 확인했습니다."
          control={<Checkbox name="agreementCheck" />}
        />
        <br />
        {error.isChecked && <FormHelperText error>{error.isChecked[0]}</FormHelperText>}
      </div>
      <Button type="submit" className="self-center w-60" variant="contained" disableElevation>
        탈퇴하기
      </Button>
    </form>
  );
}
