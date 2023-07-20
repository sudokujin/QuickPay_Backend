import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import FriendService from "../service/FriendService.ts";
import { Link } from 'react-router-dom';

interface Friend {
    id: number;
    accountId: number;
    friendId: number;
}

const FriendsList: React.FC = () => {
    const [friends, setFriends] = useState<Friend[]>([]);

    useEffect(() => {
        const accountId = localStorage.getItem("accountId");
        if (accountId !== null) {
            const accountIdNumber: number = parseInt(accountId);
            if (!isNaN(accountIdNumber)) {
                FriendService.getFriendsByAccountId(accountIdNumber)
                    .then(response => {
                        setFriends(response.data);
                    })
                    .catch(error => {
                        console.error("Error fetching friends:", error);
                    });
            } else {
                console.error("Account ID is not a number: ", accountId);
            }
        } else {
            console.error("No account ID found in local storage.");
        }
    }, []);

    if (friends.length === 0) {
        return (
            <React.Fragment>
                <h2 style={{ color: 'blue' }}>You have no friends.</h2>
                <Link color="primary" to="/friends/add">Add a friend</Link>
            </React.Fragment>
        );
    }

    return (
        <List>
            {friends.map((friend) => (
                <React.Fragment key={friend.id}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Friend" src="/static/images/avatar.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <span style={{ color: 'blue' }}>{`Friend ID: ${friend.friendId}`}</span>
                            }
                            secondary={
                                <span style={{ color: 'blue' }}>{`Account ID: ${friend.accountId}`}</span>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </React.Fragment>
            ))}
        </List>
    );
};

export default FriendsList;