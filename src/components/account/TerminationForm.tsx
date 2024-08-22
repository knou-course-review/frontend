"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { terminateAccount } from "@/actions/account";
import { useTerminationContext } from "@/hooks/useTerminationContext";

export default function TerminationForm() {
  const router = useRouter();
  const [error, setError] = useState<{ isChecked?: string[] }>({});
  const { setTerminatedStatus } = useTerminationContext();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const checkedStatus = formData.get("agreementCheck");
    const data = { isChecked: checkedStatus === "on" };
    const res = await terminateAccount(data);
    if (res.isValid) {
      setTerminatedStatus();
      router.push("/account-terminated");
    }
    if (res.errors?.isChecked) {
      setError(res.errors);
    }
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
