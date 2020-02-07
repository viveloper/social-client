import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userAction';
// MUI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

class Notifications extends Component {
  state = {
    anchorEl: null
  };

  handleOpen = e => {
    this.setState({ anchorEl: e.target });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onMenuOpened = () => {
    // const unreadNotificationsIds = this.props.notifications
    //   .filter(notification => !notification.read)
    //   .map(notification => notification.notificationId);
    // this.props.markNotificationsRead(unreadNotificationsIds);
  };

  onMenuClosed = () => {
    this.setState({ anchorEl: null });
    const unreadNotificationsIds = this.props.notifications
      .filter(notification => !notification.read)
      .map(notification => notification.notificationId);
    this.props.markNotificationsRead(unreadNotificationsIds);
  };

  render() {
    const notifications = this.props.notifications;
    const anchorEl = this.state.anchorEl;
    const unreadNotificationsLength = notifications.filter(
      notification => notification.read === false
    ).length;
    dayjs.extend(relativeTime);

    let notificationsIcon;
    if (notifications && notifications.length > 0) {
      unreadNotificationsLength > 0
        ? (notificationsIcon = (
            <Badge badgeContent={unreadNotificationsLength} color="secondary">
              <NotificationsIcon />
            </Badge>
          ))
        : (notificationsIcon = <NotificationsIcon />);
    } else {
      notificationsIcon = <NotificationsIcon />;
    }

    const notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map(notification => {
          const verb = notification.type === 'like' ? 'liked' : 'commented on';
          const time = dayjs(notification.createdAt).fromNow();
          const iconColor = notification.read ? 'primary' : 'secondary';
          const icon =
            notification.type === 'like' ? (
              <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            );
          return (
            <MenuItem key={notification.createdAt} onClick={this.handleClose}>
              {icon}
              <Typography
                component={Link}
                color="primary"
                variant="body1"
                to={`/users/${notification.recipient}/scream/${notification.screamId}`}
              >
                {notification.sender} {verb} your scream {time}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>
          You have no notifications yet
        </MenuItem>
      );

    return (
      <>
        <Tooltip placement="top" title="Notifications">
          <IconButton
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {notificationsIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.onMenuClosed}
          onEntered={this.onMenuOpened}
        >
          {notificationsMarkup}
        </Menu>
      </>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.user.notifications
});

const mapDispatchToProps = dispatch => ({
  markNotificationsRead: notificationIds => {
    dispatch(markNotificationsRead(notificationIds));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
