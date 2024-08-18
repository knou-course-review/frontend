"use client";

import { useState } from "react";
import { Button, List, ListItem, ListItemText, TextField } from "@mui/material";

export default function AccountInfoForm() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const handleClick = () => setIsExpanded(true);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-col justify-between">
      <List sx={{ width: "fit-content" }}>
        <ListItem>
          <ListItemText sx={{ width: "5rem" }}>아이디</ListItemText>
          <TextField value={"eflekjf"} size="small" disabled />
        </ListItem>
        <ListItem>
          <ListItemText>이메일</ListItemText>
          <TextField value={"dlfkjas@knou.ac.kr"} size="small" disabled />
        </ListItem>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          {isExpanded && (
            <>
              <ListItem>
                <ListItemText>비밀번호</ListItemText>
                <TextField name="password" placeholder="기존 비밀번호" size="small" />
              </ListItem>
              <ListItem>
                <ListItemText />
                <TextField name="newPassword" placeholder="새 비밀번호" size="small" />
              </ListItem>
              <ListItem>
                <ListItemText />
                <TextField name="newPasswordConfirm" placeholder="새 비밀번호 확인" size="small" />
              </ListItem>
              <div className="px-4 self-end">
                <Button type="submit" variant="contained" disableElevation>
                  비밀번호 변경
                </Button>
              </div>
            </>
          )}
          {!isExpanded && (
            <div className="px-4 self-end">
              <Button variant="contained" onClick={handleClick} disableElevation>
                비밀번호 변경
              </Button>
            </div>
          )}
          {error && <p className="px-4 self-end text-rose-600">{error}</p>}
        </form>
      </List>
    </div>
  );
}
