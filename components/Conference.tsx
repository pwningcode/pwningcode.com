import dynamic from 'next/dynamic';
import React from 'react';
import { IJitsiMeetingProps } from '@jitsi/react-sdk/lib/types';

const JitsiMeeting = dynamic(
	() =>
		import('@jitsi/react-sdk').then(
			({ JitsiMeeting }) => JitsiMeeting
		) as any,
	{
		ssr: false,
	}
) as React.FC<IJitsiMeetingProps>;

export default function Conference() {
	const handleJitsiIFrameRef1 = (iframeRef: HTMLDivElement) => {
		iframeRef.style.border = '10px solid #3d3d3d';
		iframeRef.style.background = '#3d3d3d';
		iframeRef.style.height = `100%`;
		iframeRef.style.marginBottom = '20px';
	};

	return (
		<div className="w-screen h-screen">
			<JitsiMeeting
				roomName="introduction-with-jason-barnes"
				domain="meet.jit.si"
				userInfo={{
					displayName: 'Guest',
					email: '',
				}}
				interfaceConfigOverwrite={{
					SHOW_CHROME_EXTENSION_BANNER: false,
					SETTINGS_SECTIONS: [
						'devices',
						'language',
						'moderator',
						'profile',
						'sounds',
					],
				}}
				getIFrameRef={handleJitsiIFrameRef1}
			/>
		</div>
	);
}
