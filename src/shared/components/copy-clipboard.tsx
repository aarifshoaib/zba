import { StyleSheet, Text, View, ClipboardStatic } from 'react-native'
import React, { useState } from 'react'
import { IconButton } from '../ui/buttons'
import { theme } from '../theme'


const CopyClipBoard = ({ color = theme.tint, size = 17, text = 'Copy' }) => {
    const [copiedText, setCopiedText] = useState('');
    const copyToClipboard = () => {
        
        setCopiedText(text);
    }

    return (
        <IconButton style={{ marginStart: 5 }} name={'clipboard-multiple-outline'} size={size} color={color} type={'material'} onclick={copyToClipboard} />
    )
}

export default CopyClipBoard

const styles = StyleSheet.create({})