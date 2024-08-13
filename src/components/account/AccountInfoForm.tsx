"use client";

import { Button, List, ListItem, ListItemText, TextField } from "@mui/material";
import { useState } from "react";

export default function AccountInfoForm() {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="flex flex-col min-h-96">
      <List>
        <ListItem>
          <ListItemText sx={{ width: "5rem" }}>아이디</ListItemText>
          <TextField value={"eflekjf"} size="small" disabled />
        </ListItem>
        <ListItem>
          <ListItemText>이메일</ListItemText>
          <TextField value={"dlfkjas@knou.ac.kr"} size="small" disabled />
        </ListItem>
        <form className="flex flex-col">
          <ListItem>
            <ListItemText>비밀번호</ListItemText>
            <TextField placeholder="기존 비밀번호" size="small" />
          </ListItem>
          <ListItem>
            <ListItemText />
            <TextField placeholder="새 비밀번호" size="small" />
          </ListItem>
          <ListItem>
            <ListItemText />
            <TextField placeholder="새 비밀번호 확인" size="small" />
          </ListItem>
          <div className="px-4 self-end">
            <Button variant="contained" disableElevation>
              비밀번호 변경
            </Button>
          </div>
        </form>
      </List>
    </div>
  );
}
