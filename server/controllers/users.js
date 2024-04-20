import User from "../models/User"

export const getUser= async(req,res) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user)

    }
    catch(err)
{
    return res.status(500).json({error: err.message} );

}
}

export const getUserFriends= async(req,res) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id)=> User.findById(id))
        )

        const formattedFriends = friends.map(
            ({_id, firstName, lastName,picturePath}) =>{
                return{_id, firstName, lastName,picturePath};
            }
        )
        res.status(200).json(formattedFriends)

    }
    catch(err)
{
    return res.status(500).json({error: err.message} );

}
}

export const addRemoveFriend = async(req,res) => {
    try{
        const {id, friendId} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        }else{
            user.friends.push(friendId);
            friend.friends.push(id);

        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id)=> User.findById(id))
        )

        const formattedFriends = friends.map(
            ({_id, firstName, lastName,picturePath}) =>{
                return{_id, firstName, lastName,picturePath};
            }
        )
        res.status(200).json(formattedFriends)

    }
    catch(err)
{
    return res.status(500).json({error: err.message} );

}
}