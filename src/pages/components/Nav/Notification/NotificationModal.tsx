import React, { useState } from "react";
import { Typography, List, Box } from "@mui/material";
import {
  DetailText,
  ListItemTextBox,
  NotificationModalBox,
  NotificationModalContainer,
  NotificationModalHead,
  NotificationModalListItem,
  ProfileModalContainer,
} from "../Container";
import { color } from "@/theme/color";
import NotiDropdownMenu from "./NotiDropdownMenu";
import { t } from "i18next";
import DetailsModal from "./NotiDetailModal";

const notifications = [
  {
    title: "Deployment for Translation update",
    subtitle: "Live Consultation",
    date: "2024.04.05",
    detailsLink: "#",
  },
  {
    title: "Deployment for Translation update",
    subtitle: "Live Consultation",
    date: "2024.04.05",
    detailsLink: "#",
  },
  {
    title: "Translation for markets have been updated",
    subtitle: "Live Consultation",
    date: "2024.03.29",
    detailsLink: "#",
  },
  {
    title: "Deployment for Translation update",
    subtitle: "Live Consultation",
    date: "2024.03.09",
    detailsLink: "#",
  },
  {
    title: "Deployment for Translation update",
    subtitle: "Live Consultation",
    date: "2024.02.04",
    detailsLink: "#",
  },
  {
    title: "Deployment for Translation update",
    subtitle: "Live Consultation",
    date: "2024.02.01",
    detailsLink: "#",
  },
  {
    title: "Deployment for Translation update",
    subtitle: "Live Consultation",
    date: "2024.02.01",
    detailsLink: "#",
  },
  {
    title: "Deployment for Translation update",
    subtitle: "Live Consultation",
    date: "2024.02.01",
    detailsLink: "#",
  },
  {
    title: "Deployment for Translation update",
    subtitle: "Live Consultation",
    date: "2024.02.01",
    detailsLink: "#",
  },
  {
    title: "Deployment for Translation update",
    subtitle: "Live Consultation",
    date: "2024.02.01",
    detailsLink: "#",
  },
  {
    title: "Deployment for Translation update",
    subtitle: "Live Consultation",
    date: "2024.02.01",
    detailsLink: "#",
  },
];

interface NotificationModalProps {
  isNotificationModalOpen: boolean;
  handleNotificationModalClose: () => void;
}
const items = ["ALL", "myHyundai", "Live Consultation"];
const defaultItem = "ALL";

const NotificationModal = ({
  isNotificationModalOpen,
  handleNotificationModalClose,
}: NotificationModalProps) => {
  const [isDetailsModalOpen, setIsDetailModalOpen] = useState(false);

  const handleDetailClick = () => setIsDetailModalOpen(true);
  const handleDetailsModalClose = () => setIsDetailModalOpen(false);

  const handleItemSelected = (item: string) => {
    console.log("Selected item:", item);
  };
  return (
    <ProfileModalContainer
      open={isNotificationModalOpen}
      onClose={handleNotificationModalClose}
    >
      <NotificationModalContainer>
        <NotificationModalHead>
          <Typography variant="label1" color={color.text.black}>
            {t("gnb:notification")}
          </Typography>
          <NotiDropdownMenu
            items={items}
            defaultItem={defaultItem}
            onItemSelected={handleItemSelected}
          />
        </NotificationModalHead>
        <NotificationModalBox>
          <List sx={{ padding: "0" }}>
            {notifications.map((notification, index) => (
              <NotificationModalListItem key={index}>
                <ListItemTextBox>
                  <Typography variant="sub_element1" color={color.text.black}>
                    {notification.title}
                  </Typography>
                  <Typography
                    variant="sub_element2"
                    color={color.text.black_40}
                  >{`${notification.subtitle} ・ ${notification.date}`}</Typography>
                </ListItemTextBox>
                {notification.detailsLink && (
                  <DetailText onClick={handleDetailClick}>
                    {t("gnb:details")}
                  </DetailText>
                )}
              </NotificationModalListItem>
            ))}
          </List>
        </NotificationModalBox>
        <DetailsModal
          isDetailsModalOpen={isDetailsModalOpen}
          handleDetailsModalClose={handleDetailsModalClose}
        />
      </NotificationModalContainer>
    </ProfileModalContainer>
  );
};

export default NotificationModal;
