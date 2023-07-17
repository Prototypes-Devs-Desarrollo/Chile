import React from 'react';
import { List, ListItem, ListItemPrefix, ListItemSuffix, Chip, Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ['Name', 'Job', 'Employed', ''];

const TABLE_ROWS = [
   {
      name: 'John Michael',
      job: 'Manager',
      date: '23/04/18',
   },
   {
      name: 'Alexa Liras',
      job: 'Developer',
      date: '23/04/18',
   },
   {
      name: 'Laurent Perrier',
      job: 'Executive',
      date: '19/09/17',
   },
   {
      name: 'Michael Levi',
      job: 'Developer',
      date: '24/12/08',
   },
   {
      name: 'Richard Gran',
      job: 'Manager',
      date: '04/10/21',
   },
];

const importaciones = () => {
   return (
      <div className='w-[calc(100%-256px)] h-screen overflow-y-auto'>
         <Typography variant='h1'>Importaciones</Typography>
         <Card className='w-full overflow-hidden rounded-md'>
            <List className='p-0 my-2'>
               <ListItem className='group rounded-none text-sm py-1.5 px-3 font-normal text-blue-gray-700 hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white'>
                  <ListItemPrefix>
                     {/* <OutlineIcons.InboxArrowDownIcon className='w-4 h-4' /> */}
                  </ListItemPrefix>
                  Inbox
                  <ListItemSuffix>
                     <Chip value='+99' variant='ghost' size='sm' className='rounded-full px-2 py-1 text-xs group-hover:bg-white/20 group-hover:text-white' />
                  </ListItemSuffix>
               </ListItem>
               <ListItem className='rounded-none text-sm py-1.5 px-3 font-normal text-blue-gray-700 hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white'>
                  <ListItemPrefix>
                     {/* <OutlineIcons.TrashIcon className='w-4 h-4' /> */}
                  </ListItemPrefix>
                  Trash
               </ListItem>
               <ListItem className='rounded-none text-sm py-1.5 px-3 font-normal text-blue-gray-700 hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white'>
                  <ListItemPrefix>
                     {/* <OutlineIcons.Cog6ToothIcon className='w-4 h-4' /> */}
                  </ListItemPrefix>
                  Settings
               </ListItem>
            </List>
         </Card>
      </div>
   );
};

export default importaciones;
