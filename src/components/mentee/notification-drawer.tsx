"use client";

import { BellRing, CheckCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Notification } from "@/features/prototype/types";

export function NotificationDrawer({ notifications, onRead }: { notifications: Notification[]; onRead: (id: string) => void }) {
  return <div className="notification-list">{notifications.map((notification) => <article className={`notification-item notification-item--${notification.tone} ${notification.read ? "is-read" : ""}`} key={notification.id}><BellRing size={20} /><div><h3>{notification.title}</h3><p>{notification.body}</p><small>{notification.read ? "Sudah dibaca" : "Baru"}</small></div>{!notification.read && <Button aria-label={`Tandai ${notification.title} dibaca`} onClick={() => onRead(notification.id)} variant="ghost"><CheckCheck size={17} /></Button>}</article>)}</div>;
}
