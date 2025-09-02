'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, use } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { usePortfolio } from '@/hooks/usePortfolio';
import { portfolioService } from '@/api/portfolioService';
import {
    TemplateOne,
    TemplateTwo,
    TemplateThree,
    PortfolioSkeleton
} from '@/components/Portfolio';
import { Palette, Edit } from 'lucide-react';

// Page transition variants
const pageTransitionVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 }
};

const Page = ({ params }) => {
    const { user, isLoading: authLoading, token } = useAuth();
    const unwrappedParams = use(params);
    const decodedEmail = decodeURIComponent(unwrappedParams.email);

    // Safe destructuring with null check
    const authEmail = user?.email;
    const isOwner = (user?.email === decodedEmail) || (authEmail === decodedEmail);
    const canEdit = isOwner && (token || user?.email);


    const { portfolioData, updateUserDetails, loading, error } = usePortfolio(decodedEmail);
    const [isEditing, setIsEditing] = useState(false);
    const [showTemplateModal, setShowTemplateModal] = useState(false);
    const [currentTemplate, setCurrentTemplate] = useState('template1');
    const [isLoading, setIsLoading] = useState(false);
    const [userDetails, setUserDetails] = useState({});

    // Add these states for each section
    const [educationItems, setEducationItems] = useState([]);
    const [projectItems, setProjectItems] = useState([]);
    const [certificateItems, setCertificateItems] = useState([]);
    const [toolItems, setToolItems] = useState([]);

    // Fetch portfolio data
    const fetchPortfolioData = async () => {
        try {
            setLoading(true);
            const data = await portfolioService.getPortfolio(decodedEmail);
            setPortfolioData(data);
            setUserDetails({
                id: data.userDetails.id,
                name: data.userDetails.name || '',
                email: data.userDetails.email || '',
                phone_number: data.userDetails.phone_number || '',
                about: data.userDetails.about || '',
                education: data.userDetails.education || [],
                project: data.userDetails.project || [],
                certificate: data.userDetails.certificate || [],
                tool: data.userDetails.tool || [],
            });
        } catch (err) {
            console.error('Failed to fetch portfolio:', err);
            setError('Failed to fetch portfolio data');
        } finally {
            setLoading(false);
        }
    };

    // Load initial data
    useEffect(() => {
        if (decodedEmail) {
            fetchPortfolioData();
        }
    }, [decodedEmail]);

    // Set initial template
    useEffect(() => {
        if (portfolioData?.userDetails?.template !== undefined) {
            const templateMap = {
                0: 'template1',
                1: 'template2',
                2: 'template3'
            };
            setCurrentTemplate(templateMap[portfolioData.userDetails.template] || 'template1');
        }
    }, [portfolioData]);

    // Populate form fields when editing
    useEffect(() => {
        if (isEditing && portfolioData) {
            if (portfolioData.userDetails?.education) {
                setEducationItems(portfolioData.userDetails.education.map(edu => ({
                    ...edu,
                    id: edu.id
                })));
            }
            if (portfolioData.userDetails?.project) {
                setProjectItems(portfolioData.userDetails.project.map(proj => ({
                    ...proj,
                    id: proj.id,
                    links: proj.link ? proj.link.map(link => ({
                        id: link.id,
                        name: link.name,
                        url: link.url
                    })) : []
                })));
            }
            if (portfolioData.toolNames) {
                setToolItems(portfolioData.toolNames.map(toolName => ({
                    id: toolName.id,
                    name: toolName.name,
                    tools: toolName.tools ? toolName.tools.map(tool => ({
                        id: tool.id,
                        name: tool.name
                    })) : []
                })));
            }
        }
    }, [isEditing, portfolioData]);

     // Education handlers
     const handleAddEducation = () => {
        setEducationItems([...educationItems, {
            id: `new-${Date.now()}`,  // Use string prefix to identify new items
            degree: '',
            field_of_study: '',
            University: '',
            location: '',
            start_date: '',
            end_date: '',
            current_grade: ''
        }]);
    };

    const handleRemoveEducation = async (id) => {
        // Only make a delete API request if the ID is a database ID (numeric)
        if (typeof id === 'number') {
            try {
                // Get auth token from session if available
                const token = session?.user?.accessToken || '';
                const headers = {
                    'Content-Type': 'application/json',
                };
                
                // Add authorization header if token exists
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }
                
                const response = await fetch(`https://api-ape.crodlin.in/api/education/${id}/`, {
                    method: 'DELETE',
                    headers,
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(`Failed to delete education: ${errorData.message || response.statusText}`);
                }

                toast.success('Education entry removed');
            } catch (error) {
                console.error('Error removing education:', error);
                toast.error(error.message || 'Failed to remove education entry');
                return; // Don't remove from UI if server delete failed
            }
        } else {
            // For new items (with string IDs), just remove from UI without API call
            toast.success('Education entry removed');
        }

        // Remove from UI state
        setEducationItems(educationItems.filter(item => item.id !== id));
    };

    const handleEducationChange = (id, field, value) => {
        setEducationItems(educationItems.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    // Project handlers
    const handleAddProject = () => {
        setProjectItems([...projectItems, {
            id: `new-${Date.now()}`,  // Use string prefix to identify new items
            name: '',
            description: '',
            links: []
        }]);
    };

    const handleRemoveProject = async (id) => {
        // Only make a delete API request if the ID is a database ID (numeric)
        if (typeof id === 'number') {
            try {
                // Get auth token from session if available
                const token = session?.user?.accessToken || '';
                const headers = {
                    'Content-Type': 'application/json',
                };
                
                // Add authorization header if token exists
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }
                
                const response = await fetch(`https://api-ape.crodlin.in/api/projects/${id}/`, {
                    method: 'DELETE',
                    headers,
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(`Failed to delete project: ${errorData.message || response.statusText}`);
                }

                toast.success('Project removed');
            } catch (error) {
                console.error('Error removing project:', error);
                toast.error(error.message || 'Failed to remove project');
                return; // Don't remove from UI if server delete failed
            }
        } else {
            // For new items (with string IDs), just remove from UI without API call
            toast.success('Project removed');
        }

        // Remove from UI state
        setProjectItems(projectItems.filter(item => item.id !== id));
    };

    const handleProjectChange = (id, field, value) => {
        setProjectItems(projectItems.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const handleAddProjectLink = (projectId) => {
        setProjectItems(projectItems.map(project => {
            if (project.id === projectId) {
                return {
                    ...project,
                    links: [...project.links, { id: `new-${Date.now()}`, name: '', url: '' }]
                };
            }
            return project;
        }));
    };

    const handleRemoveProjectLink = async (projectId, linkId) => {
        // Only make a delete API request if the ID is a database ID (numeric)
        if (typeof linkId === 'number') {
            try {
                // Get auth token from session if available
                const token = session?.user?.accessToken || '';
                const headers = {
                    'Content-Type': 'application/json',
                };
                
                // Add authorization header if token exists
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }
                
                const response = await fetch(`https://api-ape.crodlin.in/api/links/${linkId}/`, {
                    method: 'DELETE',
                    headers,
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(`Failed to delete project link: ${errorData.message || response.statusText}`);
                }
                
                toast.success('Link removed');
            } catch (error) {
                console.error('Error removing project link:', error);
                toast.error(error.message || 'Failed to remove project link');
                return; // Don't remove from UI if server delete failed
            }
        } else {
            // For new items (with string IDs), just remove from UI without API call
            toast.success('Link removed');
        }

        // Remove from UI state
        setProjectItems(projectItems.map(project => {
            if (project.id === projectId) {
                return {
                    ...project,
                    links: project.links.filter(link => link.id !== linkId)
                };
            }
            return project;
        }));
    };

    const handleProjectLinkChange = (projectId, linkId, field, value) => {
        setProjectItems(projectItems.map(project => {
            if (project.id === projectId) {
                return {
                    ...project,
                    links: project.links.map(link =>
                        link.id === linkId ? { ...link, [field]: value } : link
                    )
                };
            }
            return project;
        }));
    };

    // Certificate handlers
    // const handleAddCertificate = () => {
    //     setCertificateItems([...certificateItems, {
    //         id: Date.now(),
    //         name: '',          
    //         competition_battled: 0,
    //         competition_won: 0
    //     }]);
    // };      

    // const handleRemoveCertificate = async (id) => {
    //     // If the item has a database ID (numeric), delete it from the database
    //     if (typeof id === 'number') {
    //         try {
    //             const response = await fetch(`https://api-ape.crodlin.in/api/certificates/${id}/`, {
    //                 method: 'DELETE',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             });

    //             if (!response.ok) {
    //                 throw new Error('Failed to delete certificate');
    //             }

    //             toast.success('Certificate removed');
    //         } catch (error) {
    //             console.error('Error removing certificate:', error);
    //             toast.error('Failed to remove certificate: ' + error.message);
    //             return; // Don't remove from UI if server delete failed
    //         }
    //     }

    //     // Remove from UI state
    //     setCertificateItems(certificateItems.filter(item => item.id !== id));
    // };

    // const handleCertificateChange = (id, field, value) => {
    //     setCertificateItems(certificateItems.map(item => 
    //         item.id === id ? { ...item, [field]: value } : item
    //     ));
    // };

    // Tools handlers
    const handleAddToolName = () => {
        setToolItems([...toolItems, {
            id: `new-${Date.now()}`,  // Use string prefix to identify new items
            name: '',
            tools: []
        }]);
    };

    const handleRemoveToolName = async (id) => {
        // Only make a delete API request if the ID is a database ID (numeric)
        if (typeof id === 'number') {
            try {
                // Get auth token from session if available
                const token = session?.user?.accessToken || '';
                const headers = {
                    'Content-Type': 'application/json',
                };
                
                // Add authorization header if token exists
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }
                
                const response = await fetch(`https://api-ape.crodlin.in/api/toolnames/${id}/`, {
                    method: 'DELETE',
                    headers,
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(`Failed to delete tool category: ${errorData.message || response.statusText}`);
                }

                toast.success('Tool category removed');
            } catch (error) {
                console.error('Error removing tool category:', error);
                toast.error(error.message || 'Failed to remove tool category');
                return; // Don't remove from UI if server delete failed
            }
        } else {
            // For new items (with string IDs), just remove from UI without API call
            toast.success('Tool category removed');
        }

        // Remove from UI state
        setToolItems(toolItems.filter(item => item.id !== id));
    };

    const handleToolNameChange = (id, value) => {
        setToolItems(toolItems.map(item =>
            item.id === id ? { ...item, name: value } : item
        ));
    };

    const handleAddToolItem = (toolNameId) => {
        setToolItems(toolItems.map(toolName => {
            if (toolName.id === toolNameId) {
                return {
                    ...toolName,
                    tools: [...toolName.tools, { id: `new-${Date.now()}`, name: '' }]
                };
            }
            return toolName;
        }));
    };

    const handleRemoveToolItem = async (toolNameId, toolId) => {
        // Only make a delete API request if the ID is a database ID (numeric)
        if (typeof toolId === 'number') {
            try {
                // Get auth token from session if available
                const token = session?.user?.accessToken || '';
                const headers = {
                    'Content-Type': 'application/json',
                };
                
                // Add authorization header if token exists
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }
                
                const response = await fetch(`https://api-ape.crodlin.in/api/tools/${toolId}/`, {
                    method: 'DELETE',
                    headers,
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(`Failed to delete tool: ${errorData.message || response.statusText}`);
                }
                
                toast.success('Tool removed');
            } catch (error) {
                console.error('Error removing tool:', error);
                toast.error(error.message || 'Failed to remove tool');
                return; // Don't remove from UI if server delete failed
            }
        } else {
            // For new items (with string IDs), just remove from UI without API call
            toast.success('Tool removed');
        }

        // Remove from UI state
        setToolItems(toolItems.map(toolName => {
            if (toolName.id === toolNameId) {
                return {
                    ...toolName,
                    tools: toolName.tools.filter(tool => tool.id !== toolId)
                };
            }
            return toolName;
        }));
    };


    const handleToolItemChange = (toolNameId, toolId, value) => {
        setToolItems(toolItems.map(toolName => {
            if (toolName.id === toolNameId) {
                return {
                    ...toolName,
                    tools: toolName.tools.map(tool =>
                        tool.id === toolId ? { ...tool, name: value } : tool
                    )
                };
            }
            return toolName;
        }));
    };

    useEffect(() => {
        if (portfolioData?.userDetails) {
            setUserDetails({
                id: portfolioData.userDetails.id,
                name: portfolioData.userDetails.name || '',
                email: portfolioData.userDetails.email || '',
                phone_number: portfolioData.userDetails.phone_number || '',
                about: portfolioData.userDetails.about || '',
                education: portfolioData.userDetails.education || [],
                project: portfolioData.userDetails.project || [],
                certificate: portfolioData.userDetails.certificate || [],
                tool: portfolioData.userDetails.tool || [],
            });
        }
    }, [portfolioData]);

    // Add this useEffect to set the initial template based on portfolioData
    useEffect(() => {
        if (portfolioData?.userDetails?.template !== undefined) {
            const templateMap = {
                0: 'template1',
                1: 'template2',
                2: 'template3'
            };
            setCurrentTemplate(templateMap[portfolioData.userDetails.template] || 'template1');
        }
    }, [portfolioData]);

    // Add this useEffect to populate form fields when editing is enabled
    useEffect(() => {
        if (isEditing && portfolioData) {
            // Load existing education data
            if (portfolioData.userDetails?.education) {
                setEducationItems(portfolioData.userDetails.education.map(edu => ({
                    ...edu,
                    id: edu.id // Keep the original ID for existing items
                })));
            }

            // Load existing project data
            if (portfolioData.userDetails?.project) {
                setProjectItems(portfolioData.userDetails.project.map(proj => ({
                    ...proj,
                    id: proj.id,
                    links: proj.link ? proj.link.map(link => ({
                        id: link.id,
                        name: link.name,
                        url: link.url
                    })) : []
                })));
            }

            // Load existing tool data
            if (portfolioData.toolNames) {
                setToolItems(portfolioData.toolNames.map(toolName => ({
                    id: toolName.id,
                    name: toolName.name,
                    tools: toolName.tools ? toolName.tools.map(tool => ({
                        id: tool.id,
                        name: tool.name
                    })) : []
                })));
            }
        }
    }, [isEditing, portfolioData]);

    // Modify handleUpdateUserDetails to handle both creation and updates
    const handleUpdateUserDetails = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Get auth token from session if available
            const token = session?.user?.accessToken || '';
            const headers = {
                'Content-Type': 'application/json',
            };
            
            // Add authorization header if token exists
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            // 1. Update user details first
            const userResponse = await fetch(`https://api-ape.crodlin.in/api/userdetails/${decodedEmail}/`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({
                    name: userDetails.name || '',
                    email: userDetails.email || '',
                    phone_number: userDetails.phone_number || '',
                    about: userDetails.about || '',
                }),
            });

            if (!userResponse.ok) {
                const errorData = await userResponse.json().catch(() => ({}));
                throw new Error(`Failed to update user details: ${errorData.message || userResponse.statusText}`);
            }
            
            const userData = await userResponse.json();
            const userId = userData.id;

            // Education - handle both updates and new items
            if (educationItems.length > 0) {
                for (const education of educationItems) {
                    const current_grade = education.current_grade ?
                        parseFloat(education.current_grade) : null;

                    const educationData = {
                        degree: education.degree || '',
                        field_of_study: education.field_of_study || '',
                        University: education.University || '',
                        location: education.location || '',
                        start_date: education.start_date || '',
                        end_date: education.end_date || '',
                        current_grade: current_grade,
                        user: userId
                    };

                    try {
                        // Check if item is new by looking for the 'new-' prefix in the id
                        const isNewItem = typeof education.id === 'string' && education.id.startsWith('new-');
                        
                        if (!isNewItem && typeof education.id === 'number') {
                            // Update existing education with PATCH
                            const response = await fetch(`https://api-ape.crodlin.in/api/education/${education.id}/`, {
                                method: 'PATCH',
                                headers,
                                body: JSON.stringify(educationData),
                            });
                            
                            if (!response.ok) {
                                const errorData = await response.json().catch(() => ({}));
                                throw new Error(`Failed to update education: ${errorData.message || response.statusText}`);
                            }
                        } else {
                            // Create new education with POST
                            const response = await fetch(`https://api-ape.crodlin.in/api/education/`, {
                                method: 'POST',
                                headers,
                                body: JSON.stringify(educationData),
                            });
                            
                            if (!response.ok) {
                                const errorData = await response.json().catch(() => ({}));
                                console.error('Education creation error:', errorData);
                                throw new Error(`Failed to create education: ${errorData.message || response.statusText}`);
                            }
                        }
                    } catch (eduError) {
                        console.error('Education save error:', eduError);
                        toast.error(eduError.message);
                    }
                }
            }

            // Projects - handle both updates and new items
            if (projectItems.length > 0) {
                for (const project of projectItems) {
                    let projectId;

                    const projectData = {
                        name: project.name || '',
                        description: project.description || '',
                        user: userId
                    };

                    try {
                        // Check if item is new by looking for the 'new-' prefix in the id
                        const isNewItem = typeof project.id === 'string' && project.id.startsWith('new-');
                        
                        if (!isNewItem && typeof project.id === 'number') {
                            // Update existing project
                            const response = await fetch(`https://api-ape.crodlin.in/api/projects/${project.id}/`, {
                                method: 'PATCH',
                                headers,
                                body: JSON.stringify(projectData),
                            });
                            
                            if (!response.ok) {
                                const errorData = await response.json().catch(() => ({}));
                                throw new Error(`Failed to update project: ${errorData.message || response.statusText}`);
                            }

                            projectId = project.id;
                        } else {
                            // Create new project
                            const createResponse = await fetch(`https://api-ape.crodlin.in/api/projects/`, {
                                method: 'POST',
                                headers,
                                body: JSON.stringify(projectData),
                            });
                            
                            if (!createResponse.ok) {
                                const errorData = await createResponse.json().catch(() => ({}));
                                console.error('Project creation error:', errorData);
                                throw new Error(`Failed to create project: ${errorData.message || createResponse.statusText}`);
                            }

                            const newProject = await createResponse.json();
                            projectId = newProject.id;
                        }

                        // Handle project links
                        if (project.links && project.links.length > 0) {
                            for (const link of project.links) {
                                const linkData = {
                                    name: link.name || '',
                                    url: link.url || '',
                                    project: projectId
                                };

                                try {
                                    // Check if item is new by looking for the 'new-' prefix in the id
                                    const isNewLink = typeof link.id === 'string' && link.id.startsWith('new-');
                                    
                                    if (!isNewLink && typeof link.id === 'number') {
                                        // Update existing link
                                        const response = await fetch(`https://api-ape.crodlin.in/api/links/${link.id}/`, {
                                            method: 'PATCH',
                                            headers,
                                            body: JSON.stringify(linkData),
                                        });
                                        
                                        if (!response.ok) {
                                            const errorData = await response.json().catch(() => ({}));
                                            throw new Error(`Failed to update link: ${errorData.message || response.statusText}`);
                                        }
                                    } else {
                                        // Create new link
                                        const response = await fetch(`https://api-ape.crodlin.in/api/links/`, {
                                            method: 'POST',
                                            headers,
                                            body: JSON.stringify(linkData),
                                        });
                                        
                                        if (!response.ok) {
                                            const errorData = await response.json().catch(() => ({}));
                                            console.error('Link creation error:', errorData);
                                            throw new Error(`Failed to create link: ${errorData.message || response.statusText}`);
                                        }
                                    }
                                } catch (linkError) {
                                    console.error('Link save error:', linkError);
                                    toast.error(linkError.message);
                                }
                            }
                        }
                    } catch (projectError) {
                        console.error('Project save error:', projectError);
                        toast.error(projectError.message);
                    }
                }
            }

            // Tools - handle both updates and new items
            if (toolItems.length > 0) {
                for (const toolCategory of toolItems) {
                    let toolNameId;

                    try {
                        // Check if item is new by looking for the 'new-' prefix in the id
                        const isNewCategory = typeof toolCategory.id === 'string' && toolCategory.id.startsWith('new-');
                        
                        if (!isNewCategory && typeof toolCategory.id === 'number') {
                            // Update existing tool category
                            const response = await fetch(`https://api-ape.crodlin.in/api/toolnames/${toolCategory.id}/`, {
                                method: 'PATCH',
                                headers,
                                body: JSON.stringify({
                                    name: toolCategory.name || '',
                                    user: userId
                                }),
                            });
                            
                            if (!response.ok) {
                                const errorData = await response.json().catch(() => ({}));
                                throw new Error(`Failed to update tool category: ${errorData.message || response.statusText}`);
                            }

                            toolNameId = toolCategory.id;
                        } else {
                            // Create new tool category
                            const createResponse = await fetch(`https://api-ape.crodlin.in/api/toolnames/`, {
                                method: 'POST',
                                headers,
                                body: JSON.stringify({
                                    name: toolCategory.name || '',
                                    user: userId
                                }),
                            });
                            
                            if (!createResponse.ok) {
                                const errorData = await createResponse.json().catch(() => ({}));
                                console.error('Tool category creation error:', errorData);
                                throw new Error(`Failed to create tool category: ${errorData.message || createResponse.statusText}`);
                            }

                            const newToolName = await createResponse.json();
                            toolNameId = newToolName.id;
                        }

                        // Handle tools within this category
                        if (toolCategory.tools && toolCategory.tools.length > 0) {
                            for (const tool of toolCategory.tools) {
                                const toolData = {
                                    name: tool.name || '',
                                    tool_name: toolNameId
                                };

                                try {
                                    // Check if item is new by looking for the 'new-' prefix in the id
                                    const isNewTool = typeof tool.id === 'string' && tool.id.startsWith('new-');
                                    
                                    if (!isNewTool && typeof tool.id === 'number') {
                                        // Update existing tool
                                        const response = await fetch(`https://api-ape.crodlin.in/api/tools/${tool.id}/`, {
                                            method: 'PATCH',
                                            headers,
                                            body: JSON.stringify(toolData),
                                        });
                                        
                                        if (!response.ok) {
                                            const errorData = await response.json().catch(() => ({}));
                                            throw new Error(`Failed to update tool: ${errorData.message || response.statusText}`);
                                        }
                                    } else {
                                        // Create new tool
                                        const response = await fetch(`https://api-ape.crodlin.in/api/tools/`, {
                                            method: 'POST',
                                            headers,
                                            body: JSON.stringify(toolData),
                                        });
                                        
                                        if (!response.ok) {
                                            const errorData = await response.json().catch(() => ({}));
                                            console.error('Tool creation error:', errorData);
                                            throw new Error(`Failed to create tool: ${errorData.message || response.statusText}`);
                                        }
                                    }
                                } catch (toolError) {
                                    console.error('Tool save error:', toolError);
                                    toast.error(toolError.message);
                                }
                            }
                        }
                    } catch (toolCategoryError) {
                        console.error('Tool category save error:', toolCategoryError);
                        toast.error(toolCategoryError.message);
                    }
                }
            }

            // Refresh portfolio data after all updates
            await updateUserDetails();
            toast.success('Profile updated successfully!');
            setIsEditing(false);
        }
        catch (error) {
            console.error('Error updating user details:', error);
            toast.error(error.message || 'Failed to update user details');
        }
        finally {
            setIsLoading(false);
        }
    };

   
    // Modify handleTemplateChange to update both local state and backend
    const handleTemplateChange = async (template) => {
        let templateValue;
        switch (template) {
            case 'template1':
                templateValue = 0;
                break;
            case 'template2':
                templateValue = 1;
                break;
            case 'template3':
                templateValue = 2;
                break;
            default:
                templateValue = 0;
        }

        try {
            const response = await fetch(`https://api-ape.crodlin.in/api/userdetails/${decodedEmail}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    template: templateValue,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update template');
            }

            setCurrentTemplate(template);
            setShowTemplateModal(false);
            toast.success('Template updated successfully!');
        } catch (error) {
            console.error('Error updating template:', error);
            toast.error('Failed to update template');
        }
    };

   // Render the appropriate template
   const renderTemplate = () => {
    return (
        <motion.div
            key={currentTemplate}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransitionVariants}
            transition={{ duration: 0.3 }}
        >
            {(() => {
                switch (currentTemplate) {
                    case 'template1':
                        return <TemplateOne userDetails={userDetails} portfolioData={portfolioData} />;
                    case 'template2':
                        return <TemplateTwo userDetails={userDetails} portfolioData={portfolioData} />;
                    case 'template3':
                        return <TemplateThree userDetails={userDetails} portfolioData={portfolioData} />;
                    default:
                        return <TemplateOne userDetails={userDetails} portfolioData={portfolioData} />;
                }
            })()}
        </motion.div>
    );
};

    if (loading) return <PortfolioSkeleton />;
    if (authLoading) return <PortfolioSkeleton />;
    if (error) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl backdrop-blur-md text-center"
                >
                    <p className="text-red-400">Error loading portfolio data</p>
                </motion.div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-neutral-950 relative">
                {renderTemplate()}

                {/* Enhanced edit button */}
            {isOwner && (
                    <div className="fixed bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 z-50 flex flex-col sm:flex-row gap-3 sm:space-x-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowTemplateModal(true)}
                            className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl bg-neutral-900/90 backdrop-blur-xl border border-neutral-800/50 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center sm:justify-start space-x-2 text-sm sm:text-base"
                        >
                            <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="hidden sm:inline">Change Design</span>
                            <span className="sm:hidden">Design</span>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsEditing(true)}
                            className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl bg-neutral-900/90 backdrop-blur-xl border border-neutral-800/50 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center sm:justify-start space-x-2 text-sm sm:text-base"
                        >
                            <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="hidden sm:inline">Edit Profile</span>
                            <span className="sm:hidden">Edit</span>
                        </motion.button>
                    </div>
                )}


               {/* Edit Modal */}
               {isEditing && isOwner && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-neutral-900/80 p-8 rounded-2xl max-w-4xl w-full mx-4 border border-neutral-800 backdrop-blur-md max-h-[90vh] overflow-y-auto"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">Edit Profile</h2>

                            <form onSubmit={handleUpdateUserDetails} className="space-y-6">
                                {/* Basic Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-neutral-300">Basic Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-neutral-400 block mb-2">Name</label>
                                            <input
                                                type="text"
                                                value={userDetails.name || ''}
                                                onChange={(e) => setUserDetails(prev => ({ ...prev, name: e.target.value }))}
                                                className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-neutral-400 block mb-2">Email</label>
                                            <input
                                                type="email"
                                                value={userDetails.email || ''}
                                                onChange={(e) => setUserDetails(prev => ({ ...prev, email: e.target.value }))}
                                                className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-neutral-400 block mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                value={userDetails.phone_number || ''}
                                                onChange={(e) => setUserDetails(prev => ({ ...prev, phone_number: e.target.value }))}
                                                className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-neutral-400 block mb-2">About</label>
                                            <textarea
                                                value={userDetails.about || ''}
                                                onChange={(e) => setUserDetails(prev => ({ ...prev, about: e.target.value }))}
                                                className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                rows={3}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Education section */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold text-neutral-300">Education</h3>
                                        <motion.button
                                            type="button"
                                            onClick={handleAddEducation}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                                        >
                                            Add Education
                                        </motion.button>
                                    </div>

                                    {educationItems.map((education) => (
                                        <div key={education.id} className="p-4 border border-neutral-700 rounded-lg space-y-4 bg-neutral-800/50">
                                            <div className="flex justify-between items-center">
                                                <h4 className="text-neutral-300 font-medium">Education Entry</h4>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveEducation(education.id)}
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    Remove
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-neutral-400 block mb-2">Degree</label>
                                                    <input
                                                        type="text"
                                                        value={education.degree}
                                                        onChange={(e) => handleEducationChange(education.id, 'degree', e.target.value)}
                                                        className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                        placeholder="Bachelor's, Master's, etc."
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-neutral-400 block mb-2">Field of Study</label>
                                                    <input
                                                        type="text"
                                                        value={education.field_of_study}
                                                        onChange={(e) => handleEducationChange(education.id, 'field_of_study', e.target.value)}
                                                        className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                        placeholder="Computer Science, Business, etc."
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-neutral-400 block mb-2">University</label>
                                                    <input
                                                        type="text"
                                                        value={education.University}
                                                        onChange={(e) => handleEducationChange(education.id, 'University', e.target.value)}
                                                        className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                        placeholder="University name"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-neutral-400 block mb-2">Location</label>
                                                    <input
                                                        type="text"
                                                        value={education.location}
                                                        onChange={(e) => handleEducationChange(education.id, 'location', e.target.value)}
                                                        className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                        placeholder="City, Country"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-neutral-400 block mb-2">Start Date</label>
                                                    <input
                                                        type="date"
                                                        value={education.start_date}
                                                        onChange={(e) => handleEducationChange(education.id, 'start_date', e.target.value)}
                                                        className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-neutral-400 block mb-2">End Date</label>
                                                    <input
                                                        type="date"
                                                        value={education.end_date}
                                                        onChange={(e) => handleEducationChange(education.id, 'end_date', e.target.value)}
                                                        className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-neutral-400 block mb-2">Current Grade</label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="10"
                                                        step="0.1"
                                                        value={education.current_grade}
                                                        onChange={(e) => handleEducationChange(education.id, 'current_grade', e.target.value)}
                                                        className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                        placeholder="e.g. 4.0"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Project section */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold text-neutral-300">Projects</h3>
                                        <motion.button
                                            type="button"
                                            onClick={handleAddProject}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                                        >
                                            Add Project
                                        </motion.button>
                                    </div>

                                    {projectItems.map((project) => (
                                        <div key={project.id} className="p-4 border border-neutral-700 rounded-lg space-y-4 bg-neutral-800/50">
                                            <div className="flex justify-between items-center">
                                                <h4 className="text-neutral-300 font-medium">Project Entry</h4>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveProject(project.id)}
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    Remove
                                                </button>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="text-neutral-400 block mb-2">Project Name</label>
                                                    <input
                                                        type="text"
                                                        value={project.name}
                                                        onChange={(e) => handleProjectChange(project.id, 'name', e.target.value)}
                                                        className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-neutral-400 block mb-2">Description</label>
                                                    <textarea
                                                        value={project.description}
                                                        onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                                                        className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                        rows={3}
                                                    />
                                                </div>

                                                {/* Project Links */}
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-center">
                                                        <h5 className="text-neutral-400">Links</h5>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleAddProjectLink(project.id)}
                                                            className="text-blue-400 hover:text-blue-300 text-sm"
                                                        >
                                                            + Add Link
                                                        </button>
                                                    </div>

                                                    {project.links.map((link) => (
                                                        <div key={link.id} className="flex items-center space-x-2">
                                                            <div className="flex-grow">
                                                                <input
                                                                    type="text"
                                                                    value={link.name}
                                                                    onChange={(e) => handleProjectLinkChange(project.id, link.id, 'name', e.target.value)}
                                                                    placeholder="Link Name"
                                                                    className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                                />
                                                            </div>
                                                            <div className="flex-grow">
                                                                <input
                                                                    type="text"
                                                                    value={link.url}
                                                                    onChange={(e) => handleProjectLinkChange(project.id, link.id, 'url', e.target.value)}
                                                                    placeholder="URL"
                                                                    className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                                />
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveProjectLink(project.id, link.id)}
                                                                className="text-red-400 hover:text-red-300"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Certificate section */}
                                {/* <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold text-neutral-300">Certificates</h3>
                                        <motion.button
                                            type="button"
                                            onClick={handleAddCertificate}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                                        >
                                            Add Certificate
                                        </motion.button>
                                    </div>
                                    
                                    {certificateItems.map((certificate) => (
                                        <div key={certificate.id} className="p-4 border border-neutral-700 rounded-lg space-y-4 bg-neutral-800/50">
                                            <div className="flex justify-between items-center">
                                                <h4 className="text-neutral-300 font-medium">Certificate Entry</h4>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveCertificate(certificate.id)}
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-neutral-400 block mb-2">Certificate Name</label>
                                                    <input
                                                        type="text"
                                                        value={certificate.name}
                                                        onChange={(e) => handleCertificateChange(certificate.id, 'name', e.target.value)}
                                                        className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-neutral-400 block mb-2">Competitions Battled</label>
                                                    <input
                                                        type="number"
                                                        value={certificate.competition_battled}
                                                        onChange={(e) => handleCertificateChange(certificate.id, 'competition_battled', e.target.value)}
                                                        className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-neutral-400 block mb-2">Competitions Won</label>
                                                    <input
                                                        type="number"
                                                        value={certificate.competition_won}
                                                        onChange={(e) => handleCertificateChange(certificate.id, 'competition_won', e.target.value)}
                                                        className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div> */}

                                {/* Tools section */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold text-neutral-300">Tools</h3>
                                        <motion.button
                                            type="button"
                                            onClick={handleAddToolName}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                                        >
                                            Add Tool Category
                                        </motion.button>
                                    </div>

                                    {toolItems.map((toolName) => (
                                        <div key={toolName.id} className="p-4 border border-neutral-700 rounded-lg space-y-4 bg-neutral-800/50">
                                            <div className="flex justify-between items-center">
                                                <h4 className="text-neutral-300 font-medium">Tool Category</h4>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveToolName(toolName.id)}
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    Remove
                                                </button>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="text-neutral-400 block mb-2">Category Name</label>
                                                    <input
                                                        type="text"
                                                        value={toolName.name}
                                                        onChange={(e) => handleToolNameChange(toolName.id, e.target.value)}
                                                        className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                        placeholder="e.g. Programming Languages"
                                                    />
                                                </div>

                                                {/* Tool Items */}
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-center">
                                                        <h5 className="text-neutral-400">Tools</h5>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleAddToolItem(toolName.id)}
                                                            className="text-blue-400 hover:text-blue-300 text-sm"
                                                        >
                                                            + Add Tool
                                                        </button>
                                                    </div>

                                                    {toolName.tools.map((tool) => (
                                                        <div key={tool.id} className="flex items-center space-x-2">
                                                            <div className="flex-grow">
                                                                <input
                                                                    type="text"
                                                                    value={tool.name}
                                                                    onChange={(e) => handleToolItemChange(toolName.id, tool.id, e.target.value)}
                                                                    placeholder="Tool Name"
                                                                    className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                                                                />
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveToolItem(toolName.id, tool.id)}
                                                                className="text-red-400 hover:text-red-300"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                    {/* submit button */}
                                    <div className="flex justify-end mt-6">
                                    <motion.button
                                        type="submit"
                                        disabled={isLoading}
                                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 mr-1"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {isLoading ? 'Saving...' : 'Save Changes'}
                                    </motion.button>

                                    <motion.button
                                        type="button"
                                        onClick={() => {
                                            setIsEditing(false);
                                        }}
                                        className="px-6 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors disabled:opacity-50 mr-1"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Cancel
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}


                {/* Template Selection Modal */}
                {showTemplateModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="bg-neutral-900/95 backdrop-blur-xl p-6 rounded-2xl w-full max-w-4xl relative border border-neutral-800"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">Choose Your Template</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                {[
                                    {
                                        id: 'template1',
                                        name: 'Modern Dark',
                                        description: 'A sleek dark theme with AI effects',
                                        gradient: 'from-blue-500 to-purple-500'
                                    },
                                    {
                                        id: 'template2',
                                        name: 'Minimal Light',
                                        description: 'Clean and minimal design with light colors',
                                        gradient: 'from-emerald-500 to-teal-500'
                                    },
                                    {
                                        id: 'template3',
                                        name: 'Gradient Glow',
                                        description: 'Dynamic design with gradient effects',
                                        gradient: 'from-pink-500 to-rose-500'
                                    },
                                ].map((template) => (
                                    <motion.button
                                        key={template.id}
                                        onClick={() => handleTemplateChange(template.id)}
                                        className={`group p-4 rounded-xl border-2 transition-all duration-300 ${currentTemplate === template.id
                                            ? 'border-blue-500 bg-blue-500/10'
                                            : 'border-neutral-700 hover:border-neutral-500'
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="aspect-video bg-neutral-800/50 rounded-lg mb-4 overflow-hidden group-hover:shadow-lg transition-all duration-300">
                                            <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${template.gradient} opacity-20 group-hover:opacity-30 transition-opacity`}>
                                                <span className="text-white/70 font-medium">Preview</span>
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">{template.name}</h3>
                                        <p className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">{template.description}</p>
                                    </motion.button>
                                ))}
                            </div>
                            <div className="mt-6 flex justify-end space-x-4">
                                <motion.button
                                    onClick={() => setShowTemplateModal(false)}
                                    className="px-6 py-3 rounded-lg bg-neutral-800 text-white hover:bg-neutral-700 transition-all duration-300"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Close
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </>
    );
};

export default Page; 