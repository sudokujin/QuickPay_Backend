import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import FriendService from "../service/FriendService.ts";
import Link from "@mui/material/Link";

interface Friend {
    id: number;
    accountId: number;
    friendId: number;
}

const FriendsList: React.FC = () => {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [uniqueFriendIds, setUniqueFriendIds] = useState<Set<number>>(new Set());

    const fetchFriends = async () => {
        try {
            const accountId = localStorage.getItem('accountId');
            if (accountId) {
                const response = await FriendService.getFriendsByAccountId(parseInt(accountId));
                setFriends(response.data);

                // Collect unique Friend IDs
                const uniqueIds = new Set<number>();
                response.data.forEach((friend) => {
                    uniqueIds.add(friend.friendId);
                });
                setUniqueFriendIds(uniqueIds);
            }
        } catch (error) {
            console.error("Error fetching friends:", error);
        }
    };

    useEffect(() => {
        fetchFriends();
        const intervalId = setInterval(fetchFriends, 5000); // Fetch data every 5 seconds

        return () => {
            clearInterval(intervalId); // Clear the interval on component unmount
        };
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
                    {uniqueFriendIds.has(friend.friendId) && ( // Check if the Friend ID is unique
                        <>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Friend" src="/static/images/avatar.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <span style={{ color: 'blue' }}>{`Account ID: ${friend.friendId}`}</span>
                                    }
                                    secondary={
                                        <span style={{ color: 'blue' }}>{`Friend ID: ${friend.accountId}`}</span>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </>
                    )}
                </React.Fragment>
            ))}
        </List>
    );
};

export default FriendsList;
