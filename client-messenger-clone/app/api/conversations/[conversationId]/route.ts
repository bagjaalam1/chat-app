import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
    conversationId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const { conversationId } = params;
        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        console.log('ini jalan')
        console.log(`conversation ID: ${conversationId} hehehehehehe`)

        const existingConversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        })
        console.log('ini jalan')

        if (!existingConversation) {
            return new NextResponse('Invalid ID', { status: 400 })
        }

        console.log('ini jalan')

        const deletedConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                }
            }
        })

        console.log('ini jalan')
        console.log(deletedConversation)

        return NextResponse.json(deletedConversation)
    } catch (error: any) {
        console.log('ERROR_CONVERSATION_DELETE')
        return new NextResponse('Internal Error', { status: 500 })
    }
}