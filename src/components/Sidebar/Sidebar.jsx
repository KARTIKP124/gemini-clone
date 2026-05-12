import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

function Sidebar() {

    const [extended, setExtended] = useState(false)

    const { onSent, prevPrompt, setPrevPrompt, setRecentPrompt, newChat } = useContext(Context)

    const loadPrompt = async(prompt) => {
      setRecentPrompt(prompt)
        await onSent(prompt)
    }


    return (
        <div className="sidebar">

            <div className="top">

                <img
                    onClick={() => setExtended(prev => !prev)}
                    className='menu'
                    src={assets.menu_icon}
                    alt=""
                />

                <div onClick={() => newChat()} className="new-chat">
                    <img className='plus' src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>

                {extended ?

                    <div className="recents">

                        <p className="recent-title">Recent</p>

                        {prevPrompt.map((item, index) => {
                            return (
                                <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                                    <img src={assets.message_icon} alt="" />
                                    <p>{item.slice(0, 20)}...</p>
                                </div>
                            )
                        })}

                    </div>

                    : null}

            </div>

            <div className="bottom">

                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help & FAQ</p> : null}
                </div>

                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>History</p> : null}
                </div>

                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>Settings</p> : null}
                </div>

            </div>

        </div>
    )
}

export default Sidebar